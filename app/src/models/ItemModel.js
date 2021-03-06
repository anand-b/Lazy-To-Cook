const Model = require("../framework/Model");
const {isPrice} = require("../utils/Validators");

class ItemModel extends Model {
    constructor(/* string */ id,
                /* string */ name,
                /* string */ description,
                /* numeric */ price,                
                /* RestaurantItemCategoryModel */ category,
                /* string */ image,
                /* OutletModel[] */ outlets) {
        super(id);
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.outlets = outlets || null;
    }

    isValid() {
        return (this.name && this.name.length
            && isPrice(this.price));
    }

}

module.exports = ItemModel;