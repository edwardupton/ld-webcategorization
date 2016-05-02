
Process
-------

1. Render HTML from the page (should handle SPAs using browser like PhantomJS)
2. Extract text from the HTML
3. Categorise into topic from the text
4. Compare with existing manual tags to evaluate the algorithm

Possible algorithms
-------------------

http://www.datumbox.com/machine-learning-api/
* Up to 1000 free queries a day
* UserID - 6953
* API key - 7284cd75cb81c08e2e672b7676b0dad7


Training Set
------------

A sample of 479 websites tagged by:
* _GA Industry_ - the self-tagged industry group chosen in Google Analytics.  Usually not accurate due to a web developer setting it up without reference to the business.
* _Manual tagging_ - 17 industry groups categorised by eye-balling the page
* _Sub-grouping_ - a longer list of 100 tags from eye-balling the page