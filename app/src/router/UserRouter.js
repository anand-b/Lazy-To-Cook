const Router = require("../framework/Router");
const UserModel = require("../models/UserModel");
const AddressModel = require("../models/AddressModel");
const UserHandler = require("../handlers/UserHandler");

AppUtil = require("../utils/AppUtil");

/**
 * Router class for setting up the routes of restaurant entity.
 *
 * NOTE: Please do not include routes for another entity in this class.
 */

class UserRouter extends Router {
    constructor(app) {
        super(app);
        this.init("user", "");
    }

    /**
     * GET /api/users/:id
     */
    get(id, request, response) {
        const self = this;
        const userModel = new UserModel(id, null, null, null, null, null, null);
        new UserHandler().fetch(userModel).then(function (foundUser) {
            if (foundUser) {
                foundUser = foundUser.toJSON(true);
                console.log(foundUser);
                foundUser = self.addHateoas(foundUser);
                response.status(200).json(foundUser).end();
            }
        }).catch(function (error) {
            console.error(error);
            response.status(500).send("Error occurred while getting a user. Please check logs for details.").end();
        });
    }

    /**
     * PUT /api/users/:id
     */
    update(id, request, response) {
        const self = this;
        const userId = request.params["id"];
        if (!request.isAuthenticated() || !AppUtil.isUser(request) || !AppUtil.isOwner(request, userId)) {
            return AppUtil.denyAccess(response);
        }
        const addressModel = new AddressModel(request.body.address.id, request.body.address.line1, request.body.address.line2, request.body.address.city, request.body.address.state, request.body.address.zipcode);
        const userModel = new UserModel(userId.toString(), request.body.first_name, request.body.middle_name, request.body.last_name, request.body.dob, request.body.email, addressModel);
        if (!userModel.isValid()) {
            return AppUtil.badRequest(response);
        }
        new UserHandler().update(userModel).then(function (updatedUser) {
            if (updatedUser) {
                updatedUser = updatedUser.toJSON();
                updatedUser = self.addHateoas(updatedUser);
            } else {
                updatedUser = {};
            }
            response.status(200).json(updatedUser).end();
        }).catch(function (error) {
            console.error(error);
            response.status(500).send("Error occurred while updating user. Please check logs for details.").end();
        });
    }

    /**
     * DELETE /api/users/:id
     */
    delete(id, request, response) {
        const userId = request.params["id"];
        if (!request.isAuthenticated() || !AppUtil.isUser(request) || !AppUtil.isOwner(request, userId)) {
            return AppUtil.denyAccess(response);
        }
        const userModel = new UserModel(userId.toString(), null, null, null, null, null, null);

        new UserHandler().delete(userModel).then(function (result) {
            request.logout();
            response.status(200).send("Success").end();
        }).catch(function (error) {
            console.error(error);
            response.status(500).send("Error occurred while deleting a user. Please check logs for details.").end();
        });

    }

    addHateoas(user) {
        return {
            ...user,
            links: [
                {
                    rel: "self",
                    href: `/api/user/${user.id}`
                }
            ]
        }
    }
}

module.exports = UserRouter;