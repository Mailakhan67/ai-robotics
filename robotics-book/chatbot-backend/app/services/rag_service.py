# from app.services.gemini_service import GeminiService
# from app.services.qdrant_service import QdrantService
# from typing import Dict, List, Tuple


# class RAGService:
#     def __init__(self):
#         self.gemini_service = GeminiService()
#         self.qdrant_service = QdrantService()

#     def process_query(
#         self,
#         user_message: str,
#         selected_text: str = None,
#         top_k: int = 5
#     ) -> Tuple[str, List[Dict]]:
#         """
#         Process a user query with RAG

#         Returns:
#             Tuple of (response, sources)
#         """
#         # Get embedding for the query
#         query_embedding = self.gemini_service.get_embedding(user_message)

#         # Search for relevant documents
#         relevant_docs = self.qdrant_service.search(query_embedding, limit=top_k)

#         # Build context from relevant documents
#         context = "\n\n".join([
#             f"[{doc['title']}]\n{doc['content']}"
#             for doc in relevant_docs
#         ])

#         # Generate response
#         response = self.gemini_service.chat_completion(
#             user_message=user_message,
#             context=context,
#             selected_text=selected_text
#         )

#         # Format sources
#         sources = [
#             {
#                 "title": doc["title"],
#                 "doc_id": doc["doc_id"],
#                 "relevance_score": round(doc["score"], 3)
#             }
#             for doc in relevant_docs[:3]  # Return top 3 sources
#         ]

#         return response, sources

#     def index_document(
#         self,
#         doc_id: str,
#         title: str,
#         content: str,
#         metadata: Dict = {}
#     ) -> int:
#         """
#         Index a document by chunking and storing embeddings

#         Returns:
#             Number of chunks indexed
#         """
#         # Split content into chunks
#         chunks = self._chunk_text(content, chunk_size=500, overlap=50)

#         # Prepare metadata for each chunk
#         chunk_metadata = [
#             {
#                 "doc_id": doc_id,
#                 "title": title,
#                 "content": chunk,
#                 "chunk_index": i,
#                 **metadata
#             }
#             for i, chunk in enumerate(chunks)
#         ]

#         # Get embeddings for all chunks
#         embeddings = self.gemini_service.get_embeddings(chunks)

#         # Store in Qdrant
#         num_indexed = self.qdrant_service.add_documents(embeddings, chunk_metadata)

#         return num_indexed

#     def _chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
#         """
#         Split text into overlapping chunks
#         """
#         words = text.split()
#         chunks = []

#         for i in range(0, len(words), chunk_size - overlap):
#             chunk = " ".join(words[i:i + chunk_size])
#             if chunk:
#                 chunks.append(chunk)

#         return chunks






























































































from app.services.gemini_service import GeminiService
from app.services.qdrant_service import QdrantService
from typing import Dict, List, Tuple


class RAGService:
    def __init__(self):
        self.gemini_service = GeminiService()
        self.qdrant_service = QdrantService()

    def process_query(
        self,
        user_message: str,
        selected_text: str = None,
        top_k: int = 5
    ) -> Tuple[str, List[Dict]]:
        """
        Process a user query with RAG
        Returns: (response, sources)
        """

        # 1️⃣ Get embedding
        query_embedding = self.gemini_service.get_embedding(user_message)

        # 2️⃣ Search documents (safe)
        try:
            relevant_docs = self.qdrant_service.search(
                query_embedding,
                limit=top_k
            ) or []
        except Exception:
            # If Qdrant fails → continue without RAG
            relevant_docs = []

        # 3️⃣ Build context safely
        context_parts = []
        
        for doc in relevant_docs:
            title = doc.get("title", "Document")
            content = doc.get("content", "")

            if content:
                context_parts.append(f"[{title}]\n{content}")

        context = "\n\n".join(context_parts)

        # 4️⃣ Ask LLM
        response = self.gemini_service.chat_completion(
            user_message=user_message,
            context=context,
            selected_text=selected_text
        )

        # 5️⃣ Build sources safely
        sources = []

        for doc in relevant_docs[:3]:
            sources.append(
                {
                    "title": doc.get("title", "Unknown"),
                    "doc_id": doc.get("doc_id"),
                    "relevance_score": round(doc.get("score", 0.0), 3),
                }
            )

        return response, sources

    def index_document(
        self,
        doc_id: str,
        title: str,
        content: str,
        metadata: Dict = {}
    ) -> int:
        """
        Index a document by chunking and storing embeddings
        """

        chunks = self._chunk_text(content, chunk_size=500, overlap=50)

        chunk_metadata = [
            {
                "doc_id": doc_id,
                "title": title,
                "content": chunk,
                "chunk_index": i,
                **metadata
            }
            for i, chunk in enumerate(chunks)
        ]

        embeddings = self.gemini_service.get_embeddings(chunks)

        num_indexed = self.qdrant_service.add_documents(
            embeddings,
            chunk_metadata
        )

        return num_indexed

    def _chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        """
        Split text into overlapping chunks
        """
        words = text.split()
        chunks = []

        for i in range(0, len(words), chunk_size - overlap):
            chunk = " ".join(words[i:i + chunk_size])
            if chunk:
                chunks.append(chunk)

        return chunks
