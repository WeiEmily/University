# University

## how to use Git

this is a note how to use Git !

clone:
git clone <copy the path from the GitHub>
ls -la mean show all files that include hidden files 

git status     : all infromation we did
git add .      : mean git track all fles  (also can change . to special files like index.HTML that yo want track) 
git commot -m "added index.html  -m "some description "      : -m mean message  "" is content, it's same as the commit box , second -m is the description box

git push       : push to server 

git push origin master : all push 

26:00



------SSH key -------
ssh-keygen -t rsa -b 4096 -C "email@example.com"  : the email address is your github account 
recommand youtube : https://www.youtube.com/watch?v=vExsOTgIOGw



##
subhedder

-------push 
create new folder in the list 
cd to this folder 
git init
git add .
create a new repository 
git remote add origin <link of you copy >
git remote -v
git push origin master
git push -u origin master






-----------branching --------
git branch      show all branch
git checkout -b feature-11        feature-11 is the name of branch <after enter change the new branch>
git checkout master      change back to master branch<hit table button can select you want >

git diff  feature-11    show all the dieffrent between  feature-11  
git push -u origin feature-11         push feature 

git branch -d feature-11          delete branch but after merge 

--we can push in the hub webpage , because it show which one merge to which 




-pull down from github----
git pull origin master



git commit -am "messgae "   add and commit together  

git merge master        merge to master


------if make mistake how to restore -------
git status     , show which one is changed 
git reset  filename        , reset the file name"

git reset HEAD~1       , reset commit 
git log                   , show all commit 
 copy hash code  (click space to exit)


 git reset <hash code>   ,reset the hashcode position

git reset --hard <hashcode>      , reset hashcode and save 





--------------fork-----------------
fork others code 
-save to own code 
