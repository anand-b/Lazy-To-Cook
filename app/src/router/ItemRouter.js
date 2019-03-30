const OutletRouter = require("./OutletRouter");
const UrlUtil = require("../utils/UrlUtil");
const AppUtil = require("../utils/AppUtil");

class ItemRouter extends OutletRouter {
    constructor(app) {
        super(app);
        this.parentEntity = "outlet";
        this.entity = "item";
        this.urlPattern = UrlUtil.appendPart(this.urlPattern, 
            UrlUtil.appendPart(AppUtil.getEntityIdPattern(this.parentEntity), AppUtil.pluralize(this.entity)));
    }

    /**
    * GET /api/restaurants/:restaurant_id/outlets/:outlet_id/items
    */
    getAll(request, response) {
        const restaurantId = request.params["restaurant_id"];
        const outletId = request.params["outlet_id"];
        response.send(`Get all items of outlet ${outletId} of restaurant ${restaurantId}`);
        response.end();

    }

    /**
    * GET /api/restaurants/:restaurant_id/outlets/:outlet_id/items/:id
    */
    get(id, request, response) {
        const restaurantId = request.params["restaurant_id"];
        const outletId = request.params["outlet_id"];
        response.send(`Get item ${id} of outlet ${outletId} of restaurant ${restaurantId}`);
        response.end();
    }

    /**
    * POST /api/restaurants/:restaurant_id/outlets/:outlet_id/items
    */
    add(request, response) {

    }

    /**
    * PUT /api/restaurants/:restaurant_id/outlets/:outlet_id/items/:id
    */
    update(id, request, response) {

    }

    /**
    * DELETE /api/restaurants/:restaurant_id/outlets/:outlet_id/items/:id
    */
    delete(id, request, response) {

    }

    wire() {
        super.wire();
    }

}

module.exports = ItemRouter;