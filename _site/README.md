# GD8
Her samles nyttige informationer om GiaDinh8  

# Links, Klik for at åbne
[Hjemmesiden](https://eo-le.github.io/GD8/)

# Guide
```bash
node --version # check if node.js is installed
npm install  -g http-server # install server to view website. OBS! doens't work with jekyll website
http-server -p 8000 # view the website at local port 8000. Need to add port 8000 in PORTS next to TERMINAL. OBS! doens't work with jekyll website

jekyll serve # view the website using jekyll in order to process front matters, _layouts and so on
gh codespace stop # choose from the list which codespace to shutdown in stead of do it from github.com

gem install bundler # kør kommandoen efter Gemfile er oprettet
bundle install # kørt derefter denne kommando
bundle exec jekyll serve # og derefter denne kommando

```  
  
## NOTES
* gh secrets can't be used directly in code. 
  Instead run a script during deployment to replaced the secrets with the actual values. 
  Ensure that the values are not exposed. 
  Don't commit the files where the secrets have been replaced.
  Use git .ignores on relevant files.
* sass @import is deprecated
  npm install -g sass-migrator
  sass-migrator module --migrate-deps './assets/css/'

### Fodnote
[^1]


[^1]: Kontakt Danny hvis du ønsker ændringer eller har forbedringsforslag.
