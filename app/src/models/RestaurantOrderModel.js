const Model = require("../framework/Model");

class RestaurantOrderModel extends Model {
    constructor(/* string */ id,
                /* string */ date,
                /* UserModel */ user,
                /* OutletModel */ outlet,
                /* string */ status,
                /* ItemModel[] */ items) {
        super(id);
        this.date = date;
        this.user = user;
        this.outlet = outlet;
        this.status = status;
        this.items = items || [];
    }
}

module.exports = RestaurantOrderModel;