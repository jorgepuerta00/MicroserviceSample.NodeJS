'use strict';

/**
 * Get User By Id.
 */
class GetUserById {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    setIdUser(id) {
        this.idUser = id;
    }

   async execute() {
        return await this.userRepository.get(this.idUser);
    }
}

module.exports = GetUserById;