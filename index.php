<!DOCTYPE html>

<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->

	<head>
		<link rel="shortcut icon" href="resources/img/el/favicon.ico">
	
		<meta charset="utf-8">
		
		<!-- Use the .htaccess and remove these lines to avoid edge case issues.
		     More info: h5bp.com/b/378 -->
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->
		
		<title>Enlightenment Lab</title>
		
		<!-- CSS: implied media=all -->
		<!-- CSS concatenated and minified via ant build script-->
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Muli:400,400italic|Ubuntu:400,700">
		<link rel="stylesheet" href="resources/css/reset.css">
		<link rel="stylesheet" href="resources/css/style.css">
		<!-- end CSS-->
		
		<!-- All JavaScript at the bottom, except for Modernizr / Respond.
		     Modernizr enables HTML5 elements & feature detects; Respond is a polyfill for min/max-width CSS3 Media Queries
		     For optimal performance, use a custom Modernizr build: www.modernizr.com/download/ -->
		<script src="resources/js/libs/modernizr.min.js"></script>
	
	</head>
	
	<body class="light">
	
		<div id="background-pattern" class="predifined-1">
		
			<div id="background-radial">
			
				<div id="container">
				
					<header class="brown">
						
					</header>
					
					<div id="card">
<?php
//addind card color randomizer variable 
$colorArr = array("red", "light-red", "oragnge", "brown", "light-purple", "grey", "dark-grey", "blue", "matte-blue", "green", "graphite");
$ram= rand(0, count($colorArr));
$colorStr = $colorArr[$ram];
?>

					
						<div id="card-header" class="<?=$colorStr?>">
							<div id="card-header-logo"></div>
							<div id="card-header-button" data-download="card.vcf" class="download mouse-events"></div>
						</div>
						<div id="card-content">
							<div id="card-content-frame">
								<div id="card-content-wrap">
									<div id="about" class="content clearfix">
										<div id="about-image">
											<img src="resources/img/ray.jpg" alt="" />
										</div>
										<div id="about-content">
											<h1>Ray. H</h1>
											<h2>Web developer</h2>
											<div style="height:10px;"></div>
											<div class="scrollable" style="padding-right: 8px;height:204px;">
												<h3>About me</h3>
												<p>	I have 6 years experiences in both front/back end web development. 
													Spciallizing in all stages of web development cycle such as Requirments gathering, 
													PSD to HTML, Implementation, Test and Deployment.</p>
												<p> I also speciallizing the following technologies: PHP, Ruby on Rail, html/css (also html5/css3),
													Javascript/Jquery/Extjs, Photoshop, Drupal, Wordpress and eCommerce.</p>
												<p> If you want to hire me, I'd love to get in touch with you and discuss details of your project.</p>	
												
												<h3>My skills</h3>
												<ul class="skills">
													<li class="clearfix">
														<div class="skill-bar-10"></div>
														<div class="skill-label">HTML4/5</div>
													</li>
													<li class="clearfix">
														<div class="skill-bar-10"></div>
														<div class="skill-label">CSS2/3</div>
													</li>
													<li class="clearfix">
														<div class="skill-bar-10"></div>
														<div class="skill-label">Javascript</div>
													</li>
													<li class="clearfix">
														<div class="skill-bar-7"></div>
														<div class="skill-label">Photoshop</div>
													</li>
													<li class="clearfix">
														<div class="skill-bar-8"></div>
														<div class="skill-label">LAMP</div>
													</li>
													<li class="clearfix">
														<div class="skill-bar-10"></div>
														<div class="skill-label">CMS/BLOG</div>
													</li>
													<li class="clearfix">
														<div class="skill-bar-8"></div>
														<div class="skill-label">Ruby on Rails</div>
													</li>
												</ul>
												<h3>Former jobs</h3>
												<table>
													<thead>
														<tr>
															<th style="width: 37%;">Position</th>
															<th style="width: 28%;">Company</th>
															<th style="width: 35%;">Hired</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>Web Developer</td>
															<td>New York University</td>
															<td>2011 - Present</td>
														</tr>
														<tr>
															<td>Web Developer</td>
															<td>Stylesight Inc.</td>
															<td>2008 - 2011</td>
														</tr>
														<tr>
															<td>Application Developer</td>
															<td>Database Publishing Consultants Inc.</td>
															<td>2007 - 2008</td>
														</tr>
														<tr>
															<td>Software Engineer</td>
															<td>Computer Associates Inc.</td>
															<td>2006 - 2006</td>
														</tr>
														<tr>
															<td>Software Engineer</td>
															<td>Bose Corporation</td>
															<td>2005 - 2005</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div id="work" class="content">
										<h1>My work</h1>
										<div id="work-gallery-frame">
											<ul id="work-gallery" class="clearfix">
												<li>
													<a href="resources/img/gallery/gt.jpg" rel="external"><img src="resources/img/gallery/gt_thumbnail.jpg" alt="" /></a>
												</li>
												<li>
													<a href="resources/img/gallery/praise.jpg" rel="external"><img src="resources/img/gallery/praise_thumbnail.jpg" alt="" /></a>
												</li>
												<li>
													<a href="resources/img/gallery/wedding.jpg" rel="external"><img src="resources/img/gallery/wedding_thumbnail.jpg" alt="" /></a>
												</li>
												<li>
													<a href="resources/img/gallery/return_heart.jpg" rel="external"><img src="resources/img/gallery/return_heart_thumbnail.jpg" alt="" /></a>
												</li>
												<li>
													<a href="resources/img/gallery/el_page.jpg" rel="external"><img src="resources/img/gallery/el_thumbnail.jpg" alt="" /></a>
												</li>
												<li>
													<a href="resources/img/gallery/card.jpg" rel="external"><img style="width: 60px; margin:auto; display: block;" src="resources/img/gallery/card_thumbnail.jpg" alt="" /></a>
												</li>
												<li>
													<a href="resources/img/gallery/image_7.jpg" rel="external"><img src="resources/img/gallery/thumbnail_7.jpg" alt="" /></a>
												</li>
												<li>
													<a href="resources/img/gallery/image_8.jpg" rel="external"><img src="resources/img/gallery/thumbnail_8.jpg" alt="" /></a>
												</li>
											</ul>
										</div>
									</div>
									<div id="social" class="content">
										<h1>Social</h1>
										<ul id="social-networks" class="clearfix">
											<li><a href="http://www.facebook.com/profile.php?id=532420634"><img src="resources/img/social/facebook_32.png" alt="" data-text="Follow me on {network}" data-network="Facebook" /></a></li>
											<li><a href="https://plus.google.com/u/0/107820296006092461150/posts"><img src="resources/img/social/google_plus_32.png" alt="" data-text="Follow me on {network}" data-network="Google+" /></a></li>
											<li><a href="http://www.blogger.com/follow-blog.g?blogID=20556118"><img src="resources/img/social/blogger_32.png" alt="" data-text="Follow me on {network}" data-network="Blogger" /></a></li>
											<li><a href="#"><img src="resources/img/social/linkedin_32.png" alt="" data-text="Follow me on {network}" data-network="LinkedIn" /></a></li>
											<li><a href="#"><img src="resources/img/social/delicious_32.png" alt="" data-text="Follow me on {network}" data-network="Delicious" /></a></li>
											<li><a href="#"><img src="resources/img/social/dribbble_32.png" alt="" data-text="Follow me on {network}" data-network="Dribbble" /></a></li>
											<li><a href="#"><img src="resources/img/social/tumblr_32.png" alt="" data-text="Follow me on {network}" data-network="Tumblr" /></a></li>
											
											<!---<li><a href="#"><img src="resources/img/social/deviantart_32.png" alt="" data-text="Follow me on {network}" data-network="deviantART" /></a></li>											
											<li><a href="#"><img src="resources/img/social/flickr_32.png" alt="" data-text="Follow me on {network}" data-network="Flickr" /></a></li>
											<li><a href="#"><img src="resources/img/social/youtube_32.png" alt="" data-text="Follow me on {network}" data-network="YouTube" /></a></li>
											<li><a href="#"><img src="resources/img/social/digg_32.png" alt="" data-text="Follow me on {network}" data-network="Digg" /></a></li>
											<li><a href="#"><img src="resources/img/social/vimeo_32.png" alt="" data-text="Follow me on {network}" data-network="Vimeo" /></a></li>
											<li><a href="#"><img src="resources/img/social/skype_32.png" alt="" data-text="Follow me on {network}" data-network="Skype" /></a></li> -->

										</ul>
										<div id="twitter"></div>
									</div>
									<div id="contact" class="content">
										<h1>Contact me</h1>
										<div id="contact-address">
											<p>Ray. H</p>
											<p>2056 W 10th Street, Brooklyn</p>
											<p>New York</p>
											<p>United States of America</p>
										</div>
										<div id="contact-info">
											<strong>Telephone:</strong><span>917_714_6742</span><br />
											<strong>E-mail:</strong><span>ray@enlightenment-lab.com</span>
										</div>
										<div id="contact-form">
											<form action="action.php" method="post">
												<input type="text" name="name" value="Name" class="placeholder" />
												<input type="text" name="email" value="E-mail" class="placeholder" />
												<textarea name="message" class="placeholder">Message</textarea>
												<div class="status">email was sent<br/>successfully</div>
												<div class="button mouse-events"><div>Send email</div></div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="card-footer"></div>
					
					</div>
					
					<nav>
						<ul class="clearfix">
							<li class="active"><a href="/about">About</a></li>
							<li><a href="/work">Work</a></li>
							<li><a href="/social">Social</a></li>
							<li><a href="/contact">Contact</a></li>
						</ul>
					</nav>
				
				</div>
				
			</div>
		
		</div>
		
		
		<!-- JavaScript at the bottom for fast page loading -->
		
		<!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="resources/js/libs/jquery.min.js"><\/script>')</script>
		
		
		<!-- scripts concatenated and minified via ant build script-->
		<script defer src="resources/js/mylibs/jquery.address.js"></script>
		<script defer src="resources/js/mylibs/jquery.easing.js"></script>
		<script defer src="resources/js/mylibs/jquery.widget.js"></script>
		<script defer src="resources/js/mylibs/jquery.mousewheel.js"></script>
		<script defer src="resources/js/mylibs/jquery.mousewheel.intent.js"></script>
		<script defer src="resources/js/mylibs/jquery.scroll.js"></script>
		<script defer src="resources/js/mylibs/jquery.tweet.js"></script>
		<script defer src="resources/js/mylibs/jquery.validate.js"></script>
		<script defer src="resources/js/mylibs/jquery.fancybox.js"></script>
		<script defer src="resources/js/mylibs/jquery.gallery.js"></script>
		<script defer src="resources/js/mylibs/jquery.tooltip.js"></script>
		<script defer src="resources/js/mylibs/jquery.social.js"></script>
		<script defer src="resources/js/plugins.js"></script>
		<script defer src="resources/js/script.js"></script>
		<!-- end scripts-->
	
	</body>

</html>