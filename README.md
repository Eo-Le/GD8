# GD8
Her samles nyttige informationer om GiaDinh8

# Getting started
## Jekyll Requirement
* Installing Extension: GitHub Actions on codespace
* Check ruby -v = 3.3.4 which is -ge 2.5.0
* Check gem -v = 3.5.11 which is installed
* Check gcc -v = 9.4.0 which is installed
* Check g++ -v = 9.4.0 which is installed
* make -v = 4.2.1 which is installed
  
## Jekyll Quick Start
* Install the jekyll and bundler gems: 
  ```bash
  gem install jekyll bundler
  ```
* Create a new Gemfile to list your project’s dependencies:
  ```bash
  bundle init
  ```
* Edit the Gemfile in a text editor and add jekyll as a dependency:
  ```bash
  gem "jekyll"
  ```
* Run bundle to install jekyll for your project.
  ```bash
  bundle
  ```
* bundle info [gemname] to locate the gem
  ```bash
  bundle info jekyll
  ```
* You can now prefix all jekyll commands listed in this tutorial with bundle exec to make sure you use the jekyll version defined in your Gemfile.
  ```
  bundle exec jekyll serve
  ```
* Run bundle install again if Gemfile has been updated
  ```bash
  bundle install
  ```
* Use `bundle info [gemname]` to see where a bundled gem is installed.
  ```
  bundle info jekyll-timeago
  ```
* Use `bundle exec jekyll serve` to host the website using the bundled gems
  ```bash
  bundle exec jekyll serve
  ```

## Test javascript  
* Inline, works
  ```html
  <button onclick="alert('Hello! This is a simple alert message.')">Click Me!</button>
  ```
* Rel link, works
  ```
  need to add front matter and relative url to index.html
  ```

## Debugging error
* error can't find favicon.ico. Not solved. Somehow error disappeared.
  ```bash
  bundle exec jekyll serve --trace --verbose
  ```

  ## When switching to new branch
  * have to run
    ```bash
    bundle install
    bundle exec jekyll serve
    ```
  * change pages
    * change the branch to be deployed
    * save
    * change back to deployed by Github Actions


[^1]: [Jekyll Requirement](https://jekyllrb.com/docs/installation/#requirements)  
[^2]: [Jekyll Quick Start](https://jekyllrb.com/docs/)  
[^3]: [Github Actions in codespace](https://jekyllrb.com/docs/continuous-integration/github-actions/)