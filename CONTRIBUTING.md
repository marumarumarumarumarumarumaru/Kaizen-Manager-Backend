# How to contribute
Thank you for your interest in contributing to Kaizen Manger!

We wanted to make this project open source to make this project management tool evolve over time with inputs from people around the world.

**Quick Reference**
* Noticed an issue but not sure how to fix? [Create an issue](https://github.com/marumarumarumarumarumarumaru/Kaizen-Manager-Backend/issues)
* Found a bug that you can help fix it? [File a PR](https://github.com/marumarumarumarumarumarumaru/Kaizen-Manager-Backend/pulls)

## Submitting new changes
Please send a Github Pull Request with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)). 

Clear log message for your commits are appreciated. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "Quick summary of the commit
    > 
    > A paragraph describing what changed and its impact."

Also, make sure to work on the change not in the mainline (`main`) but in your own branch. We'll be merging it to the mainline once PR is approved.

## Coding conventions

Please see our code to get a general idea of the style used for this project. We focus on readability.

* Indent using 2 spaces
* This is open source software. Other people will take a look at the codes we have, so please keep it neat and nice.
* Please put spaces after list items and method parameters:
  * `[1, 2, 3]`, not `[1,2,3]`,
  * around operators (`x += 1`, not `x+=1`),
  * and around hash arrows/rockets/whatever-you-call `=>`.
* Please use cwd-relative paths rather than root-relative paths in image URLs in any CSS. 
  * So instead of url('/images/blah.gif'), use url('../images/blah.gif').


Cheers, 

Corey Fusako and Marcos
