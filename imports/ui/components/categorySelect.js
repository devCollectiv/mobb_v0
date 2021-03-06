import Categories from '/imports/startup/collections/categories';
import Listings from '/imports/startup/collections/listings';

import './categorySelect.html';

Template.catSelect.onCreated(function () {
  this.subscribe('categories');
  this.subscribe('listings_locs');
});

Template.catSelect.helpers({
  categories: function () {
    return Categories.find();
  },
  catCount: function(cat) {
    return Listings.find({categories: {$elemMatch: {$in: [ cat ]}}}).count();
  }
});

// Template.catSelect.events({
//   'click .cat_item': function(event,templateInstance) {
//     $('.dropdown-button').dropdown('close');
//   },
// });



// Template.catSelect.helpers({
//   get_categories: function () {
//     var results = [];

//     var mapChildren = function(category, level) {
//       // add the appropriate number of dashes before each name
//       var prefix = Array(2 * level).join('--');
//       results.push({_id: category._id, name: prefix + category.name});

//       // repeat for each child category
//       var children = Categories.find({parentID: category._id}).fetch();
//       _.each(children, function(c) {
//         // make sure to increment the level for the correct prefix
//         mapChildren(c, level + 1);
//       });
//     };

//     // map each of the root categories - I'm unsure if the parent
//     // selector is correct or if it should be {parentId: {$exists: false}}
//     _.each(Categories.find({parentID: ''}).fetch(), function(c) {
//       mapChildren(c, 0);
//     });

//     // results should be an array of objects like {_id: String, name: String}
    
//     // let cursor = Session.get('categories');
//     // let cursor = Categories.find({});
//     return results;
//   },
// });