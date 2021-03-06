$(document).ready( function () {
        // Setup the search form in the navbar.  This is globally done, but the action is unique
	// for each page, based on how the html_menubar template sets the action attribute of the
        // form.
        $('#navsearch').ajaxForm({
                dataType:       'json',
                cache:          false,
                timeout:        30000,
                beforeSubmit:   function() {
			//Don't try to process empty queries
                        if( $('#navsearchq').val() == '' ) {
                                return(false);
                        }
			//Give some visual indication that we're waiting for results
			//and lock the query box
                        $('#navSpinner').show();
                        $('#navsearchq').attr("disabled", true);
			//Set a default content in case no results are returned.
                        $('#divNavSearchResults').append('<p>No Results</p>');
                },
                success:        function(data) {
			//If an error occured on the backend, give a warning message
                        if(data.status == "false") {
                                showMessage( data.description, data.status, 5 );
				data.query = '';
                                $('#divNavSearchResults').empty();
                                $('#divNavSearchResults').append('<center><p>Error during search: ' + data.description + '</p></center>');
                        } else {
				//If we got a blank result, then say so
        	                var results = data.data;
                	        $('#divNavSearchResults').empty();
				if( results.length < 1 ) {
        		                $('#divNavSearchResults').append('<p>No Results</p>');
				} else {
	                                //Put the results in a list, inside a hidden div
                        	        //$('#divNavSearchResults').append('<ul>');
                                	//for( i = 0 ; i < results.length ; i++ ) {
	                                //        $('#divNavSearchResults').append('<li><a href="' + results[i]['url'] + '">' + results[i]['title'] + '</a></li>');
        	                        //}
                	                //$('#divNavSearchResults').append('</ul>');
                                        $('#search-template').tmpl(data).appendTo('#divNavSearchResults');
				}
                        }

                        //Initialize the popover with the contents of the hidden div
                        $('#navsearch').data('popover', null).popover({
                                animation:true,
                                html:true,
                                placement:'bottom',
                                trigger:'manual',
                                title:'Search Results for "<span class="popoverquery">' + data.query + '</span>" <button class="close btnCloseSearchResults">&times;</button>',
                                content: function(ele) { return $('#divNavSearchResults').html(); },
				template: '<div class="popover <?echo $section?>-searchpop"><div class="arrow"></div><div class="popover-inner popSearchResults"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
                        });

			//Show the popover
                        $('#navsearch').popover('show');
			$('.btnCloseSearchResults').click( function() {
				$('#navsearch').popover('hide');
			});
					//After the results are appended, call a post-search function if one is defined
                                        if( typeof searchPostLoad == 'function' ) {
						searchPostLoad();
					}

                        //Unlock the search box and hide the spinner
                        $('#navSpinner').hide();
                        $('#navsearchq').attr("disabled", false);
               }
        });

});
