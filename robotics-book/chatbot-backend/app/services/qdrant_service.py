from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from typing import List, Dict
from app.config import settings
import uuid


class QdrantService:
    def __init__(self):
        self.client = QdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key,
        )
        self.collection_name = settings.qdrant_collection_name

    def initialize_collection(self, vector_size: int = 768):  # Changed from 1536 to 768 for Gemini embeddings
        """Initialize Qdrant collection if it doesn't exist"""
        try:
            collections = self.client.get_collections().collections
            collection_names = [c.name for c in collections]

            if self.collection_name not in collection_names:
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(
                        size=vector_size,
                        distance=Distance.COSINE
                    )
                )
                print(f"Created collection: {self.collection_name} with vector size {vector_size}")
            else:
                print(f"Collection already exists: {self.collection_name}")
                # Check if existing collection has the right vector size
                collection_info = self.client.get_collection(self.collection_name)
                expected_size = vector_size
                actual_size = collection_info.config.params.vectors.size
                if actual_size != expected_size:
                    print(f"Collection has vector size {actual_size}, expected {expected_size}. Recreating...")
                    # Delete the existing collection and recreate with correct size
                    self.client.delete_collection(self.collection_name)
                    print(f"Deleted collection: {self.collection_name}")

                    # Recreate with correct vector size
                    self.client.create_collection(
                        collection_name=self.collection_name,
                        vectors_config=VectorParams(
                            size=vector_size,
                            distance=Distance.COSINE
                        )
                    )
                    print(f"Recreated collection: {self.collection_name} with vector size {vector_size}")
        except Exception as e:
            print(f"Error initializing collection: {e}")
            raise

    def add_documents(self, embeddings: List[List[float]], metadata: List[Dict]):
        """Add document embeddings to Qdrant"""
        points = [
            PointStruct(
                id=str(uuid.uuid4()),
                vector=embedding,
                payload=meta
            )
            for embedding, meta in zip(embeddings, metadata)
        ]

        self.client.upsert(
            collection_name=self.collection_name,
            points=points
        )
        return len(points)

    def search(self, query_embedding: List[float], limit: int = 5) -> List[Dict]:
        """Search for similar documents"""

        try:
            # Use the standard search method which should be available in all qdrant-client versions
            hits = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=limit
            )

            result_list = []
            for hit in hits:
                # Extract payload information from the hit
                payload = getattr(hit, 'payload', {})

                if isinstance(payload, dict):
                    content = payload.get("content", "")
                    title = payload.get("title", "")
                    doc_id = payload.get("doc_id", "")
                else:
                    # If payload is not a dict, try to access the attributes directly
                    content = getattr(payload, 'content', '') if hasattr(payload, 'content') else ''
                    title = getattr(payload, 'title', '') if hasattr(payload, 'title') else ''
                    doc_id = getattr(payload, 'doc_id', '') if hasattr(payload, 'doc_id') else ''

                # Extract score from the hit
                score = getattr(hit, 'score', 0.0) if hasattr(hit, 'score') else 0.0

                result_list.append({
                    "content": content,
                    "title": title,
                    "doc_id": doc_id,
                    "score": score
                })
            return result_list
        except Exception as e:
            print(f"Qdrant search failed: {e}")
            import traceback
            print(f"Full traceback: {traceback.format_exc()}")
            # If Qdrant fails, return empty list to prevent server error
            # This ensures the chatbot can still function even if Qdrant is temporarily unavailable
            print("Qdrant search failed, returning empty results to allow chat to continue")
            return []

    def health_check(self) -> bool:
        """Check if Qdrant is accessible"""
        try:
            self.client.get_collections()
            return True
        except:
            return False
