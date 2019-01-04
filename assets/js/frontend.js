jQuery(document).ready(function (e) {
	try {
		kiwi.frontend.highlightShare(e);
		kiwi.frontend.modalPopup(e);
		kiwi.frontend.handleFloatingBarDisplay(e);
	} catch ( err ) {
		console.warn(err);
	}
});


jQuery(window).load(function () {
	kiwi_share_counts();
});

function kiwi_share_counts() {
	var socials = [];
	var social_networks = [];
	jQuery('.kiwi-highlighter-content-area').find('.kiwi-article-bar').first().find('.kiwi-share-count').each(function () {

		social_networks.push(jQuery(this).parent().attr('data-network'));

		if (jQuery(this).attr('no-transient') == 'true') {
			socials.push(jQuery(this).parent().attr('data-network'));
		}

	});

	var page_id = jQuery('ul.kiwi-article-bar').attr('page-id');

	if (socials.length > 0) {
		jQuery.ajax({
			url: kiwi_ajax_obj.kiwi_ajax_url,
			type: "POST",
			data: {
				'action': 'social_counts',
				'socials': social_networks,
				'page_id': page_id
			},
			dataType: "json",
			success: function (data) {
				jQuery('.kiwi-highlighter-content-area .kiwi-article-bar a[data-network="facebook"] span.kiwi-share-count').html(data.facebook);
				jQuery('.kiwi-highlighter-content-area .kiwi-article-bar a[data-network="twitter"] span.kiwi-share-count').html(data.twitter);
				jQuery('.kiwi-highlighter-content-area .kiwi-article-bar a[data-network="linkedin"] span.kiwi-share-count').html(data.linkedin);
				jQuery('.kiwi-highlighter-content-area .kiwi-article-bar a[data-network="pinterest"] span.kiwi-share-count').html(data.pinterest);
			},
			error: function (data) {
			}
		});
	}
}
