from flask import Flask, Blueprint, request
from flask.views import MethodView
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import datetime

from models import Base, ProductInfo

from webScraper import get_product_info

v1_blueprint = Blueprint('api-v1', __name__)

# db = Database(Base)

class ProductInfoApi(MethodView):

    # @login_required
    def get(self, product_id):

        # an Engine, which the Session will use for connection
        # resources
        some_engine = create_engine('postgresql://localhost:5432/junglescout')

        # create a configured "Session" class
        Session = sessionmaker(bind=some_engine)
        session = Session()

        entity = session.query(ProductInfo).get(product_id)

        if not entity:
            product_info_dict = get_product_info(product_id)
            entity = ProductInfo(id=product_id, categories=product_info_dict["Categories"], weight=product_info_dict["Weight"], dimensions=product_info_dict["Dimensions"], ranks=product_info_dict["Ranks"], lastFetched=datetime.datetime.now())
            session.add(entity)
            session.commit()

        return json.dumps(entity.to_dict()), 201



v1_blueprint.add_url_rule('/v1/product/<product_id>', strict_slashes=False, view_func=ProductInfoApi.as_view('product_info_api'))
