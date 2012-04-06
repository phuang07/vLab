(function($) {

	$.widget("ui.tweet", {
	
		options: {
			username: null,                           // [string or array] required unless using the 'query' option; one or more twitter screen names (use 'list' option for multiple names, where possible)
			list: null,                               // [string]   optional name of list belonging to username
			favorites: false,                         // [boolean]  display the user's favorites instead of his tweets
			query: null,                              // [string]   optional search query (see also: http://search.twitter.com/operators)
			avatarSize: 75,                           // [integer]  height and width of avatar if displayed
			count: 3,                                 // [integer]  how many tweets to display?
			fetch: null,                              // [integer]  how many tweets to fetch via the API
			page: 1,                                  // [integer]  which page of results to fetch (if count != fetch, you'll get unexpected results)
			retweets: true,                           // [boolean]  whether to fetch (official) retweets (not supported in all display modes)
			loadingText: null,                        // [string]   optional loading text, displayed while tweets load
			refreshInterval: null ,                   // [integer]  optional number of seconds after which to reload tweets
			twitterUrl: 'twitter.com',                // [string]   custom twitter url, if any (apigee, etc.)
			twitterApiUrl: 'api.twitter.com',         // [string]   custom twitter api url, if any (apigee, etc.)
			twitterSearchUrl: 'search.twitter.com'    // [string]   custom twitter search url, if any (apigee, etc.)
		},
		
		buildMethods: function() {
		
			var tweet = this;
		
			tweet.various = {
				URLRegExp: /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi,
				replace: function(regex, replacement) { return function() { var returning = []; this.each(function() { returning.push(this.replace(regex, replacement)); }); return $(returning); }; },
				parseDate: function(dateString) { return Date.parse(dateString.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3')); },
				relativeTime: function(date) {
					var relativeTo = (arguments.length > 1) ? arguments[1] : new Date(), delta = parseInt((relativeTo.getTime() - date) / 1000, 10), relative = '';
					if(delta < 60) relative = delta + ' seconds ago';
					else if(delta < 120) relative = 'a minute ago';
					else if(delta < (45 * 60)) relative = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
					else if(delta < (2 * 60 * 60)) relative = 'an hour ago';
					else if(delta < (24 * 60 * 60)) relative = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
					else if(delta < (48 * 60 * 60)) relative = 'a day ago';
					else relative = (parseInt(delta / 86400, 10)).toString() + ' days ago';
					return 'About ' + relative;
				},
				buildApiUrl: function() {
					var proto = ('https:' == document.location.protocol ? 'https:' : 'http:'), count = (tweet.options.fetch === null) ? tweet.options.count : tweet.options.fetch;
					if(tweet.options.list) {
						return proto + "//" + tweet.options.twitterApiUrl + "/1/" + tweet.options.username[0] + "/lists/" + tweet.options.list + "/statuses.json?page=" + tweet.options.page + "&per_page=" + count + "&callback=?";
					} else if(tweet.options.favorites) {
						return proto + "//" + tweet.options.twitterApiUrl + "/favorites/" + tweet.options.username[0] + ".json?page=" + tweet.options.page + "&count=" + count + "&callback=?";
					} else if(tweet.options.query === null && tweet.options.username.length == 1) {
						return proto + '//' + tweet.options.twitterApiUrl + '/1/statuses/user_timeline.json?screen_name=' + tweet.options.username[0] + '&count=' + count + (tweet.options.retweets ? '&include_rts=1' : '') + '&page=' + tweet.options.page + '&callback=?';
					} else {
						var query = (tweet.options.query || 'from:' + tweet.options.username.join(' OR from:'));
						return proto+'//' + tweet.options.twitterSearchUrl + '/search.json?&q=' + encodeURIComponent(query) + '&rpp=' + count + '&page=' + tweet.options.page + '&callback=?';
					}
				},
				markup: function(index, data) {
					var markup  = '<li class="tweet-list-item clearfix" style="z-index:' + (100 - index) + '; display:none;">';
					    markup +=     '<div class="twitter-avatar"><img src="' + data.avatar + '" alt="" width="' + tweet.options.avatarSize + '" height="' + tweet.options.avatarSize + '" /></div>';
					    markup +=     '<div class="twitter-content">';
					    markup +=         '<div class="tweet-text">' + data.tweet + '</div>';
					    markup +=         '<div class="tweet-footer">';
					    markup +=             '<div class="tweet-date">' + data.time + ' on Twitter</div>';
					    markup +=             '<div class="twitter-follow"><a href="' + data.userUrl + '" target="_blank">Follow us</a></div>';
					    markup +=         '</div>';
					    markup +=     '</div>';
					    markup += '</li>';
					return markup;
				}
				
			};
		
		},
		
		_create: function() {
		
			var tweet = this;
		
			tweet.buildMethods();
			
			$.fn.extend({
				linkUrl: tweet.various.replace(this.various.URLRegExp, function(match) { var url = (/^[a-z]+:/i).test(match) ? match : 'http://' + match; return '<a href="' + url + '">' + match + '</a>'; }),
				linkUser: tweet.various.replace(/@(\w+)/gi, '@<a href="http://' + tweet.options.twitterUrl + '/$1">$1</a>'),
				linkHash: tweet.various.replace(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi, ' <a href="http://' + tweet.options.twitterSearchUrl + '/search?q=&tag=$1&lang=all' + ((tweet.options.username && tweet.options.username.length == 1) ? '&from=' + tweet.options.username.join("%2BOR%2B") : '') + '">#$1</a>')
			});
			
			if(tweet.options.username && typeof(tweet.options.username) == "string") {
				tweet.options.username = [tweet.options.username];
			}
			
			var list = $('<ul class="tweet-list"></ul>').prependTo(tweet.element);
			var loading = $('<div class="tweet-loading">' + tweet.options.loadingText + '</div>');
			
			if(tweet.options.loadingText) tweet.element.prepend(loading);
			
			(function loadTweets() {
				$.getJSON(tweet.various.buildApiUrl(), function(data) {
				
					if(tweet.options.loadingText) loading.remove();
					
					var tweets = data.results || data;
					
					$.each(tweets, function(index, item) {
					
						var tweetInfo = {};
						    tweetInfo.item                  =   item;
						    tweetInfo.source                =   item.source;
						    tweetInfo.screenName            =   item.from_user || item.user.screen_name;
						    tweetInfo.avatarSize            =   tweet.options.avatarSize;
						    tweetInfo.avatarSmallUrl        =   (item.profile_image_url || item.user.profile_image_url);
						    tweetInfo.avatarUrl             =	tweetInfo.avatarSmallUrl.replace('normal', 'bigger');
						    tweetInfo.retweet               =   typeof(item.retweeted_status) != 'undefined';
						    tweetInfo.tweetTime             =   tweet.various.parseDate(item.created_at);
						    tweetInfo.tweetId               =   item.id_str;
						    tweetInfo.twitterBase           =   "http://" + tweet.options.twitterUrl + "/";
						    tweetInfo.userUrl               =   tweetInfo.twitterBase + tweetInfo.screenName;
						    tweetInfo.tweetUrl              =   tweetInfo.userUrl + "/status/" + tweetInfo.tweetId;
						    tweetInfo.replyUrl              =   tweetInfo.twitterBase + "intent/tweet?in_reply_to=" + tweetInfo.tweetId;
						    tweetInfo.retweetUrl            =   tweetInfo.twitterBase + "intent/retweet?tweet_id=" + tweetInfo.tweetId;
						    tweetInfo.favoriteUrl           =   tweetInfo.twitterBase + "intent/favorite?tweet_id=" + tweetInfo.tweetId;
						    tweetInfo.retweetedScreenName   =   tweetInfo.retweet && item.retweeted_status.user.screen_name;
						    tweetInfo.tweetRelativeTime     =   tweet.various.relativeTime(tweetInfo.tweetTime);
						    tweetInfo.tweetRawText          =   tweetInfo.retweet ? ('RT @' + tweetInfo.retweetedScreenName + ' ' + item.retweeted_status.text) : item.text; // avoid '...' in long retweets
						    tweetInfo.tweetText             =   $([tweetInfo.tweetRawText]).linkUrl().linkUser().linkHash()[0];
					
						list.append(tweet.various.markup(index, {
							avatar: tweetInfo.avatarUrl,
							tweet: tweetInfo.tweetText,
							time: tweetInfo.tweetRelativeTime,
							userUrl: tweetInfo.userUrl
						}));
					
					});
										
					if(tweet.options.refreshInterval) window.setTimeout(function() { loadTweets(); }, 1000 * tweet.options.refreshInterval);
					
					tweet.generatePages();
					
				});
			})();
		
		},
		
		generatePages: function() {
		
			var tweetPages = $('<div id="tweet-pages"><ul></ul></div>'),
			    tweetPagesList = tweetPages.find('ul');
			
			for(var page = 1; page <= this.options.count; page++) {
			
				var pageItem = $('<li></li>');
				
				pageItem.click(function() {
				
					$(this).siblings().removeClass('active').end().addClass('active');
					
					$('.tweet-list').find('.tweet-list-item').hide();
					
					$('.tweet-list').find('.tweet-list-item').eq($(this).index()).show();
				
				});
				
				tweetPagesList.append(pageItem);
			
			}
			
			tweetPages.find('li:first-child').trigger('click');
			
			this.element.append(tweetPages);
		
		},
		
		_setOption: function(key, value) {
		
			switch(key) {
	
				case "clear":
					
					console.log(value);
					
				break;
			
			}
			
			this._super("_setOption", key, value);
		
		},
		
		destroy: function() {
 			
 			console.log('Destroy');
 		
		}
	
	});
	
})(jQuery);