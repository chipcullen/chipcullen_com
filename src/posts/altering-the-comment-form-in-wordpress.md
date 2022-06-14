---
title: "Altering the comment form in Wordpress"
date: 2012-04-03
draft: false
tags: [comment-form, wordpress, Wordpress]
---

### Intro

Recently a client wanted to change the comment form on a [Wordpress][1] site I was building for them. Specifically, they _just_ wanted to have a Name field and the Comment field - omitting the E-mail and Website fields. They also wanted their labels to have particular wording.

I had never done this before, and after a lot of googling, I figured it out. I didn&rsquo;t feel that a lot of the tutorials out there provided enough information, so I&rsquo;m hoping to rectify that problem with this post.

<!--more-->

### Assumptions

I&rsquo;m going to assume that you are a developer type who is setting up a Wordpress site. These techniques work on Wordpress version 3 and up. In my examples, though, I&rsquo;ll be writing to the current release at the time of this post - 3.3.1. I am going to assume that you are familiar with how a theme is constructed, and that you aren't scared by a little PHP. It&rsquo;s really not that bad.

### What I&rsquo;m not going to cover

I&rsquo;m not going to go into how to _add_ pieces to the comment form that aren't already there - e.g. adding another field or button. That involves intercepting the form and making sure the database can handle it - and frankly is above my head at the moment.

### Context

These techniques all involve files that are found in your **theme**. While you _could_ hack Wordpress core, that is highly inadvisable. Every time you updated your Wordpress install, you&rsquo;d have to redo your changes.

I&rsquo;m going to discuss two techniques, and each affects a particular file. The first technique involves **comments.php**, which is found in most themes. A theme doesn&rsquo;t necessarily have a comments.php file, but it is generally considered best practice to do so.

The second technique involves changes to **functions.php**, which again is found in _most_ themes. Any real logic that happens in your theme tends to be found in a theme&rsquo;s functions.php.

### Brief historical interlude

The comment form in Wordpress used to be a fairly straightforward affair, but a messy one. Previous to version 3, the entire comment form, markup and everything, lived in a theme&rsquo;s comments.php file. While this made it a snap to alter the comment form, it resulted in a big hairy ball of code living in a theme.

In Wordpress 3, there was an effort to abstract this functionality, resulting in one simple call that would be needed in your theme:

    <?php comment_form(); ?>

This one line will produce the comment form that we all know and love. Which is, ultimately, a good thing. 96.429% of Wordpress sites out there (I asked) use the default comment form. There is no reason to have that big mess living in the theme of the vast majority of sites.

However, if you _do_ want to alter the comment form, it&rsquo;s now a little more tricky than simply locating the markup you want to change.

### A tale of two methods

There are two ways to go about altering your comment form, as I&rsquo;ve mentioned. Which method you choose depends on what you want to accomplish.

**Please note: Method 2 will _trump_ Method 1, so choose wisely**

### Method 1: Altering the comment_form() call in comments.php

This method is good for

- Altering all of the details about the comment form
- Changing the markup of the fields, including labels

This method basically entails taking the normal comment form call:

    <?php comment_form(); ?>

And expanding it with new details about how you want the form to be generated. If you want to change some of the details, you need to specify those changes with an array that will be the argument for the function. Like so:

    <?php comment_form(array()); >

You put your changes _in_ that array:

    <?php comment_form(array(
    		'parameter_name' => 'value',
    		'another_parameter' => 'value'
    	));
    ?>

What parameters can you set? Pretty much anything to do with the comment form. Take a look at the [Wordpress Codex entry on comment_form()][2], which gives you a run down of the parameters that you can set, and their default values (which Wordpress will use unless you specify otherwise).

Want to change the explanatory text after the comment field to have a link to a privacy policy, instead of the list of allowed HTML? No problem:

    <?php comment_form(array(
    		'comment_notes_after' => '<p>Please see our <a href="privacy.html">privacy policy</a>.</p>'
    	));
    ?>

If you need to set more than one parameter, but sure to include a comma at the end of each parameter, except the last one.

If you want to change the _fields_ of the comment form, that takes a little bit more effort. You will need to create a fields array (I&rsquo;m going to call it $fields) within the array you just created, and that second array will be called by the 'fields' parameter. So we will start out with that new array:

    <?php comment_form(array(
    		$fields = array(
    			'author' => '<p class="comment-form-author">' . '<label for="author">' . __( 'Your Name' ) . '</label><input id="author" name="author" type="text"  value="Your First and Last Name" size="30"' . $aria_req . ' /></p>'
    			);
    	));
    ?>

This has redefined how I want the &ldquo;author&rdquo; field to be generated. In this case, I&rsquo;ve changed the label text to say &ldquo;Your Name&rdquo; and the initial value of the field itself. Now I need to call that field within the parameters:

    <?php comment_form(array(
    		$fields = array(
    			'author' => '<p class="comment-form-author">' . '<label for="author">' . __( 'Your Name' ) . '</label><input id="author" name="author" type="text"  value="Your First and Last Name" size="30"' . $aria_req . ' /></p>'
    			);

    		'fields'				=> apply_filters( 'comment_form_default_fields', $fields ),
    		'comment_notes_after' 	=> '<p>Please see our <a href="privacy.html">privacy policy</a>.</p>'
    	));
    ?>

This piece:

    apply_filters( 'comment_form_default_fields',

Tells Wordpress you&rsquo;re going to change the fields of the comment form, then, you just supply in the name of your array ($fields, in this case). You can change each of the fields using this array technique - author, email, website and comment.

This whole comment_form() function now goes in your comments.php file at the point where you want the comment form to appear - which is usually after the listing of existing comments.

### Method 2: Using filters in functions.php

This method is good for

- Omitting or changing fields
- If you want the nuclear option, and never want to hear from those fields again

The second method employs Wordpress **filters**. Using a filter, you can override the comment form before final output.

You will want to add this filter to your theme&rsquo;s **functions.php** - which _most_ themes will have. If your theme doesn't have a functions.php file, simply create one and make sure it opens with

    <?php

Next you will want to create a function that defines your changes. As far as I&rsquo;m aware, you can only modify the _fields of the comment form_ with this method. This is an example function:

    function alter_comment_form_fields($fields){
    	$fields['email'] = '';  //removes email field
    	$fields['url'] = '';  //removes website field
    	return $fields;
    }

The name of the function can be whatever you want - it will be called later. This example function will remove the email and website fields from the comment form. Want to change the author field as well?

    function alter_comment_form_fields($fields){
    	$fields['author'] = '<p class="comment-form-author">' . '<label for="author">' . __( 'Your name, please' ) . '</label> ' . ( $req ? '<span class="required">*</span>' : '' ) .
    		            '<input id="author" name="author" type="text" placeholder="John Smith" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' /></p>';
    	$fields['email'] = '';  //removes email field
    	$fields['url'] = '';  //removes website field

    	return $fields;
    }

Keep in mind that if you want to modify a field, you have to include _everything_ that is part of the field - label and input. In this example, I&rsquo;m changing the label to say &ldquo;Your name, please&rdquo;, and I&rsquo;m modifying the input to have a [placeholder][3] attribute.

Okay, you&rsquo;ve made the modifications, now you have to call this function. You do that with a filter - in this case, one that Wordpress has built in and understands - it&rsquo;s called &ldquo;comment_form_default_fields&rdquo;:

    function alter_comment_form_fields($fields){
    	$fields['author'] = '<p class="comment-form-author">' . '<label for="author">' . __( 'Your name, please' ) . '</label> ' . ( $req ? '<span class="required">*</span>' : '' ) .
    		            '<input id="author" name="author" type="text" placeholder="John Smith" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' /></p>';
    	$fields['email'] = '';  //removes email field
    	$fields['url'] = '';  //removes website field
    	return $fields;
    }

    add_filter('comment_form_default_fields','alter_comment_form_fields');

So you take that function and filter call, put it in your functions.php file, and give it a whirl. This won&rsquo;t affect _where on the page_ your comment form appears, but rather the fields within it. The placement of the form is still controlled by your comments.php file, and where you put the comment_form() call.

Again, bear in mind that **the filter method will override whatever you do in comments.php**.

As an aside, I like to keep this snippet around so I can drop any of the fields quickly -

    function alter_comment_form_fields($fields){
    	//$fields['author'] = ''; //removes name field
    	//$fields['email'] = '';  //removes email field
    	//$fields['url'] = '';  //removes website field
    	return $fields;
    }

    add_filter('comment_form_default_fields','alter_comment_form_fields');

Just put that in your functions.php and uncomment the line with the field you want to omit. Boom. Done.

### Conclusion

I hope this post will help you make changes to your Wordpress comment form. I&rsquo;ve tried to be comprehensive and provide context, so sorry it&rsquo;s a little long. If you use these techniques - I&rsquo;d love to hear about it in the comments.

[1]: https://wordpress.org
[2]: https://codex.wordpress.org/Function_Reference/comment_form
[3]: https://www.w3.org/TR/2011/WD-html5-20110525/common-input-element-attributes.html#the-placeholder-attribute
