'use strict';

/**
 * Get all users from database
 */
class GetAllUsers {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute() {
        return await this.userRepository.all();
    }
}

module.exports = GetAllUsers;