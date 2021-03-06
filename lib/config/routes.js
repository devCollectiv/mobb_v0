
Router.route('/', {
  layoutTemplate: 'AppLayout',
  yieldRegions: {
    'map': { to: 'content' },
    'rightSide': { to: 'right' },
    'nav': { to: 'nav' },
  }
});


// Router.route('/loading', {
//   name: 'Loading',
//   layoutTemplate: 'AppLayout',
//     yieldRegions: {
//       'loadingHourglass': {to: 'content'}
//     }
// });

Router.route('/terms', {
  name: 'terms',
  layoutTemplate: 'AppLayout',
  yieldRegions: {
    nav: { to: 'nav' }
  }
});

Router.route('/owner-terms', {
  name: 'owner_terms',
  layoutTemplate: 'AppLayout',
  yieldRegions: {
    nav: { to: 'nav' }
  }
});

// Router.route('/list', {
//     layoutTemplate: 'AppLayout',
//     yieldRegions: {
//       'listPage': {to: 'content'},
//       'nav': {to: 'nav'},
//       'footer': {to: 'footer'}
//     }
// });


Router.route('/test', {
  name: 'test',
  yieldRegions: {
    'nav': {to: 'nav'},
  },
});

// Router.route('/map', function (){
//     this.render('nav', {to: 'nav'});
//     this.render('map', {to: 'content'});
//     this.render('galleryPage', {to: 'left'});
//     this.render('listPage', {to: 'bottom'});
//     this.render('footer', {to: 'footer'});
// });

// Router.route('/split', function (){
//     this.layout('SplitLayout');
//     this.render('nav', {to: 'nav'});
//     this.render('map', {to: 'left'});
//     this.render('galleryPage', {to: 'right'});
//     this.render('footer', {to: 'footer'});
// });

Router.route('/404', {
    name: '404page',
    layoutTemplate: 'AppLayout',
    yieldRegions: {
      '404page': {to: 'content'},
      'nav': {to: 'nav'}
    }
});


//  ---------------------

Router.route('/listings/:id', {
  name: 'sideCard',
  layoutTemplate: 'AppLayout',
  yieldRegions: {
    'map': { to: 'content' },
    'rightSide': { to: 'right' },
    'nav': { to: 'nav' },
  },
  subscriptions: function () {
    return Meteor.subscribe('listings_one', this.params.id);
  },
  data: function () {
    Session.set('openListing', this.params.id);
    return Listings.findOne({_id: this.params.id});
  },
  // template: 'sideCard',
  action: function () {
    if (this.ready()) {
      this.render();
      $(document).ready(function() {
              console.log('ready!');
        $('.button-collapse').sideNav('show');
      });
    }
  },
  // notFoundTemplate: '404page'
});

Router.onRun(function () {
  let data = this.data();
  console.log(data);
  if (data && !data.google_id) {
    Meteor.call('placesSearch', data.name, data.location);
  } else if (data && data.google_id){
    console.log("Have google ID");
    // if starts with q, check again
    Meteor.call('placeDetails' , data.google_id, function(error,result) {
    if (result && Meteor.isClient) {
      // console.log(result)
      // console.log(GCache.get(data.google_id));
      Session.set('thisPlace', result);
    } else {
      console.log('no response for place:', error);
    }
    });
  }
  this.next();
}, {
  only: ['sideCard']
});


Router.route('/categories/:name', {
  name: 'showCategories',
  layoutTemplate: 'AppLayout',
  yieldRegions: {
    'nav': {to: 'nav'}
  },
  subscriptions: function () {
    this.subscribe('categories');
    this.subscribe('listings', {$in: [this.params.name]}).wait();
  },
  data: function () {
    let cursor = Listings.find({
      categories: {$in: [this.params.name]}
    },{
      sort: {location: -1, name: 1}
    });
    if (cursor.fetch().length !== 0) {
      return {list: cursor.fetch()};
    } else {
      return false;  
    }
    
  },
  // action: function () {
  //   if (this.ready()) {
  //     this.render();
  //     $("[id='card_closest']").toggleClass('bounceIn bounceOut');
  //     this.next();
  //   } else {
  //     this.render();
  //     this.next();
  //   }
  // },
  notFoundTemplate: '404page'
});

// Router.route('/categories/:name', {
//   layoutTemplate: 'AppLayout',
//   yieldRegions: {
//     'map': { to: 'content' },
//     'nav': {to: 'nav'}
//   },
//   subscriptions: function () {
//     this.subscribe('listings_categories', [this.params.name]).wait();
//   },
//   data: function () {
//     let cursor = Listings.find({
//       categories: {$in: [this.params.name]}
//     },{
//       sort: {location: -1, name: 1}
//     });
//     if (cursor.fetch().length !== 0) {
//       return {list: cursor.fetch()};
//     } else {
//       return false;  
//     }
//   },
//   action: function () {
//     if (this.ready()) {
//       console.log(this);
//       this.render();

//     } else {

//     }
//   },
//   notFoundTemplate: '404page'
// });


// Router.route('/add', {
//   template: 'nav',
//   layoutTemplate: '',
//   action: function () {
//     if (this.ready()) {
//       this.render();
//       $('#modalAdd').modal('open');
//     }
//   }
// });

Router.route('/mobb', {
    name: 'about',
    layoutTemplate: 'AppLayout',
    yieldRegions: {
      'nav': {to: 'nav'}
    }
});

// ==================== "atNavButton" routes Button ====================

AccountsTemplates.configureRoute('signIn', {
  name: 'login',
  path: '/login',
  layoutTemplate: 'AppLayout',
  yieldRegions: {
    'nav': {to: 'nav'}
  },  
  redirect: '/'
});

AccountsTemplates.configureRoute('signUp', {
  name: 'register',
  path: '/register',
  layoutTemplate: 'AppLayout',
  yieldRegions: {
    'nav': {to: 'nav'}
  }
});

AccountsTemplates.configureRoute('verifyEmail', {
  name: 'verifyEmail',
  path: '/verify-email/:token',
  action: 'verifyEmail',
  redirect: '/',
  yieldRegions: {
    'nav': {to: 'nav'}
  }
});

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPassword',
  path: '/reset-password',
  redirect: '/',
  yieldRegions: {
    'nav': {to: 'nav'}
  }
});

AccountsTemplates.configureRoute('enrollAccount', {
  name: 'enrollAccount',
  path: '/enroll',
  redirect: '/',
  yieldRegions: {
    'nav': {to: 'nav'}
  }
});

// AccountsTemplates.configureRoute('ensureSignedIn', {
//     template: 'myLogin',
//     layoutTemplate: 'appLayout',
// });