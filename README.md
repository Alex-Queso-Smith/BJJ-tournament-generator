# README

[ ![Codeship Status for Cheese-Baron/BJJ-tournament-generator](https://app.codeship.com/projects/ae42d760-7a63-0136-955b-7ab0b6dfed25/status?branch=master)](https://app.codeship.com/projects/300636)

Triangle City

A Ruby on Rails web application for creating and managing Jiu Jitsu tournaments. Sign up as an Instructor to create tournaments for students in your academy.
----------------

Stack:

PostgreSQL
Ruby (2.3.3)
Rails (5.2)
React
To create an instance this application on your local machine follow these instructions

Clone this repository onto your machine

```
$ git clone https://github.com/Alex-Queso-Smith/BJJ-tournament-generator
```

Install required gems with bundle

```
$ bundle install
```
Install required JS packages with yarn

```
$ yarn install
```
Make required database migrations

```
$ rake db:create
```
```
$ rake db:migrate
```
Start the rails server

```
$ rails s
```
Start yarn

```
$ yarn start
```
Visit localhost:3000/ to see this application running on your local machine and play with all the features!

To see a demo version of this application running currently visit:

https://triangle-city.herokuapp.com/
