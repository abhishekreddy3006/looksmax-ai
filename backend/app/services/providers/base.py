from abc import ABC, abstractmethod
from app.models.analysis import StructuredAnalysis, AnalysisRequest

class VisionProvider(ABC):
    @abstractmethod
    async def analyze(self, photo_bytes: bytes, request: AnalysisRequest) -> StructuredAnalysis:
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        pass

class LLMProvider(ABC):
    @abstractmethod
    async def chat(self, messages: list, system: str, context: dict) -> str:
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        pass
