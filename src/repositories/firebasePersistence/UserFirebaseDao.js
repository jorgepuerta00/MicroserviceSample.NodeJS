'use strict';

const IUserDao = require('../interfaces/IUserDao');
const FirebaseConnection = require('./FirebaseConnection');

class UserFirebaseDao extends IUserDao {

  constructor() {
    super();
    this.firebaseConnection = new FirebaseConnection();
    this.db = this.firebaseConnection.getFirebaseContextDb();
  }

  save(entity) {
    try {
      this.db.collection('users').doc(entity.id).set(entity).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      }).catch(function (error) {
        console.error("Error adding document: ", error);
      });
    }
    catch (err) {
      console.log(err);
    }
    return entity;
  }

  remove(id) {

  }

  async get(idUser) {
    var data;
    await this.db.collection("users").doc(idUser).get().then(function (doc) {
        if (doc.exists) {
            data = doc.data();
        } else {
            data = {};
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

    return Promise.resolve(data);
}

  async all() {

    var collection = [];
    let collectionsRef = this.db.collection('users');
    let allData = await collectionsRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          collection.push(doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

      return  Promise.resolve(collection);
  }
}

const instance = new UserFirebaseDao()
Object.freeze(instance);

module.exports = instance;