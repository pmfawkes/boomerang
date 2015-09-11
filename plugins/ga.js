var GA = function() {
		this.bucket = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 9000, 10000, 15000, 20000, 30000, 45000, 60000];
		this.pageTitle = window.document.title;
};

GA.prototype.trackInAnalytics = function(beacon) {

		var self = this;

		if (!beacon.t_done || beacon.t_done < 0) {
				return;
		}

		var timeTaken = beacon.t_done;
		ga('send', 'event', 'PageLoad', self.getBucket(timeTaken), self.pageTitle, timeTaken, {'nonInteraction': 1});

};

GA.prototype.getBucket = function(timeTaken) {

		var self = this,
				bucketString = '> ' + self.bucket[self.bucket.length - 1] / 1000 + 's';

		for (b in self.bucket) {
			if (timeTaken < self.bucket[b]) {
					bucketString = '< ' + self.bucket[b] / 1000 + 's';
					break;
			}
		}

		return bucketString;
};

(function(w) {

	var d = w.document;

	BOOMR = BOOMR || {};
	BOOMR.plugins = BOOMR.plugins || {};

	if (BOOMR.plugins.GA) {
		return;
	}

	BOOMR.plugins.ga = {
		init: function(config) {
				var i, properties = ["click_url", "onbeforeunload"];

				var ga = new GA();
				BOOMR.subscribe('before_beacon', ga.trackInAnalytics);

				return this;
		}
	};

}(window));
