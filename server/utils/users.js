class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    // var user = this.users.filter((user) => user.id === id)[0];
    // or you can code like above code like this
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id)
    }

    return user;//if exist return user, if not return undefined
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDiscription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// };
//
// var me = new Person('Tan', 22);
// var description = me.getUserDiscription();
// console.log(description);
