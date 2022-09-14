<h1 style="display: inline">1Car</h1> <img width="100" style="display: inline; margin-left: 2rem" src="./public/car.png"/>

![npm](https://img.shields.io/npm/v/npm?style=for-the-badge)
![create-react-app](https://img.shields.io/static/v1?&label=&&message=CREATE-REACT-APP&style=for-the-badge&color=green)

# What is 1Car?
<img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/nina-hpn/deploy-1car?color=green&style=plastic">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/nina-hpn/deploy-1car">
<img alt="Bitbucket Server open pull requests" src="https://img.shields.io/bitbucket/pr/nina-hpn/deploy-1car">

1Car is a car rental site which allows business to list their cars only for renting purposes.

Using the boilerplate create-react-app with tailwind css and Ant design component, we are able to create a stunning app that is easy to use and modify based on your liking.

# Feature
- Login and sign up
- See all available cars
- See detail of a car
- Rent a car
- Make payment with stripe
- See your bookings and its status
- Add a car using admin account
- Modify a car detail
- See all user bookings
- Delete a user
- Change a user into admin

# 1Car Frontend resources

Frontend library: [AntDesign](https://ant.design).

Design system: [AntDesign design system](https://ant.design/docs/resources).

CSS Framework: [Tailwind CSS](https://tailwindcss.com/docs/installation).

Auth0 configuration: More details can be found at [docs](./docs/Auth0/index.md)

# Testing

This repo uses Jest for unit testing and Cypress for e2e testing.

To run tests and produce coverage report, run `npm run test:cov`.

If there's a problem generating the coverage report, try emptying the coverage folder.
