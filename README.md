# Sighties

This is a program to help Casey learn his sight words.

## TODO:

- [x] Move the shuffle button to an options overlay.
- [ ] Allow a user to mark a subset of words on which to work.
- [x] Authenticate users so they have their own sets of sight words.
- [ ] Allow people to share sight word lists.
- [ ] Track statistics on a user's set of words.
- [x] Move javascript into a separate js file.
- [x] Move styles into a separate css file.
- [x] Fix bug where ajax call to load words is causing a 401
  unauthorized error. Add :except option to :authenticate_user!
before_filter.
- [ ] Use ember.js to track the state of the app so that the ajax call
  to load words uses the correct list id.
- [ ] Get rid of hack to load lists based on the last number in
  document.URL.
- [ ] Add UI to manage lists.
- [ ] Add super list of all owned words.

["me", "and", "the", "up", "can", "go", "this", "my", "see", "at", "like", "said", "it", "is", "he", "am", "I", "come", "here", "no", "on", "that", "so", "in", "an", "yes", "you", "we", "do", "she", "to", "a"]
list1 = ["me", "and", "the", "up", "can", "go", "this", "my", "see", "at", "like"] 
list2 = ["said", "it", "is", "he", "am", "I", "come", "here", "no", "on", "that"] 
list3 = ["so", "in", "an", "yes", "you", "we", "do", "she", "to", "a"] 

mitten, kitten
clocks, socks
moon, balloon
chairs, bears
house, mouse
mush, brush

