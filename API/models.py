from sqlalchemy import Column, BigInteger, Integer, DateTime, String, JSON, TypeDecorator, VARCHAR
from sqlalchemy import func
from sqlalchemy_utils.types.uuid import UUIDType
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ProductInfo(Base):
    __tablename__ = 'product-info'
    # use UUID and not auto-incrementing ids
    id = Column(String, primary_key=True)
    categories = Column(JSON())
    weight = Column(String(100))
    dimensions = Column(String(32))
    ranks = Column(JSON())
    lastFetched = Column(DateTime)

    def to_dict(self):
        return { "id": self.id, "Weight": self.weight, "Dimensions": self.dimensions, "Ranks": self.ranks, "LastFetched": str(self.lastFetched)}
