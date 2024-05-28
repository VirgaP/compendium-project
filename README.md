# Compendium2020


+SUMMMARY


+Description

The project’s objective is to design, develop and deploy an MVP (Minimum viable product) of a web application to which users self register, creating a profile in a database, which is displayed with a geographical UI emphasis. The platform should have standard user management and authentication functions, plus Login integration with Facebook, from where information can be fetched for profile information completion and also information about events belonging to the facebook profiles that log into Compendium’s platform. 

Users will be able to create public (“creator”) profiles only through invitation. Invitations are issued only by already member profiles, who are able to each generate their own invitation URL, from which the system establishes a data field constituting a connection between the invitation issuer and recipient. The objective of this invitation system is to keep registration of profiles shown in the map mostly for artists, organisations and professionals. General public should be able to visit and register to the platform, but their profiles will be simplified, and not shown in the map, nor searchable, but useful for them to save favourites and for follow actions. Users could also apply for a creator profile, in which case they will fill an application form to be revised individually by the Ideas Block team.  

There are 6 types of profiles in the platform: Individual Creator, Organisation, Space/Venue, Team/Collective, Professional and General Public. This in order to differentiate intentions and user types and to refine the search. 

The profiles in the platform will also be interrelated by connections. Profiles can connect with each other, firstly by the invitation they received as they first created they account. But also the connections can be requested fro one profile to the other. Much as in other social networks. These connections will be saved in a dedicated table. 

Profiles will be able to create sub profiles or child profiles to their own profile. This means that they can create other profiles for other separate projects or alias they might have. Only the first profile they created will be considered a master account and all others will be children of that main profile. These sub profiles can also reflect the pages that a given user manages in facebook. There will be an option for users to Sync their profile with the information from facebook and auto create a child page with the pages it can fetch from facebook. 

In a similar fashion, profiles are able to create new profiles that belong tho the Team type. The main difference with this type is that  upon creation, there is the option to add several members to such Team of Collective. Each of these members will be considered an owner of the profile and automatically be connected to it from their own profile. 

The backend part of the development is to be implemented loosely following REST API philosophy. Mostly in that it should be a stateless service, and in that the data is modelled as objects. These Objects will be the users, their data and configuration. Also, the object result representation should be first given in a summarised collection, including links to further detailed responses for each resource/object.

The current stage of the application should have only a web based application and leave native mobile versions for later stages of the project. To attend mobiles, instead the current design should be developed as a Progressive Web App (PWA), which with practically the same web app codebase will allow users to install or add to their screen. The application should display properly in mobile screens and tablets. 

The User Interface should consist of a map (Google Maps API is only a suggestion), where the profiles of the users will be represented with a pin. A floating card should be shown at the top of the map, displaying a summary of the current focused profile, whose pin is located at the centre of the screen. Such cards could be swiped, so that the next profile is shown and the maps is now centred in the such next profile. When the user clicks on the card, he/she is redirected to a profile view. Interface should also contain a search box to find profiles, which would show a result list that the user could click/tap on to show the profile detailed view. 

The map would also display events that are fetched from facebook pages. A matching has to be done to obtain the location of the event and correctly display its location. 

Events, as well as search results can also be displayed in a List View, which would be another option for the users to see the information obtained in the search. 

Additionally, the interface map should display lines connecting the related profile pins (whenever there is an established connection, to be detailed later in this document). The objective of these connections is to display the network relationships of the users, adding value to the experience of the visitors of the platform, whether creatives, organisations or general public. The network visualisation could be created using a Javascript library such Sigma JS (which is suggested library, others could be used). 

In the area of search and filtering, the frontend part will have an autocomplete functionality for the Tags section. When the users are filling the information for their profile, the autocomplete would suggest options for the tags to be used. If the user enters a tag that is not included in the Tags table, it will be entered into it. If the users enter a word that is already included in the table, a counter will increment. There should be a recurrent task that could delete those tags that do not have more than a certain number of occurrences, which would mean that they are irrelevant. 
