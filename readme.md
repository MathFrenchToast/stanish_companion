# Stanish protocol companion mobile app

## (project for bolt.new hackathon)

This document present the application I want to write

A Mobile application to help people with achile strain to follow the six weeks stanish’protocol  
here is an [explanation in french of the protocol](https://www.hopitalduvalais.ch/fileadmin/files/disciplines/medico_therapeutique/fr/orthopedie/1.30-Tendon_d_Achille.pdf)  
To completely recover the user needs to follow the steps and not skip one workout, this needs dedication and consistency.   
The application is like a habit monitor and tracker but targeted to user that must follow the “Stanish Protocol”.

App features:

- give explanation in simple term on the protocol and what’s are the key point of succss  
- ask the where he/she want to start the program  
  - if he/she has already started prior to downloading the app, it will ask him which workout he/she wants to start  
- display a calendar to see the progress and what is left to do  
- allow to start the scheduled workout  
- on a workout:  
  - start with the first stretching 5x20s and some rest  
  - display a short animation of what to do in the core of the workout (based on the plan)  
  - display a chronometer and a rep counter: 3x10 reps  
  - at the end, congrat the user  
  - ask for the the level of pain felt:  
    - none  
    - moderate, only on the last rep  
    - high,  early during the workout  
    - this will be sored and based on the answer propose an adjustment for next time (less weight, amplitude or more rest)  
- add notification if by the end of the day (at 8:00 pm) the workout has not been done  
- add a setting page to adjust:  
  - the next workout  
  - the rest time  
  - the number of reps  
  - the hour of the reminder  
- bonus (done later):  
  - add an advert at launch  
  - ask for sharing and rating on the store  
  - add an import/export to GDrive feature  
  -   
    

Tech stack:

- flutter for both android and iOS application generation  
- local storage for settings and storing current workout  
  


Coding rules

- minimize the use of external libraries, there is always a trade-off between writing your own solution or using an external library. If the added complexity is not too high, prefe a simpler inhouse development   
- use the latest stable library when using external libraries  
- Prefer clear code upon performant but hard to read code, coebase must be highly maintainable  
- comment the code when something unusual is done  
- add a readme and keep it up-to-date. This include a checklist of what is done and what is left to do