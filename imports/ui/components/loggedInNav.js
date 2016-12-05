import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';

import './loggedInNav.html';

Template.loggedInNav.onRendered( function() {

	$(document).ready(function(){
		$('.modal-trigger').leanModal({
		    dismissible: true,
		    opacity: 0.5,
		    in_duration: 300,
		    out_duration: 200,
        starting_top: '0', // Starting top style attribute
		    ending_top: '3%', // Ending top style attribute
		    ready: function() {
		    	// console.log("Modal Triggered, from loggedInNav.js");
		        if($(".lean-overlay").length > 1) {
		            $(".lean-overlay:not(:first)").each(function() {
		                $(this).remove();
		                console.log("removed a layer");
		            });
		        }
		    },
		    complete: function() {
		    	// console.log("Modal Complete, from loggedInNav.js");
		        $(".lean-overlay").each(function() {
		            $(this).remove();
		        });
		    }
		});
	});

});
