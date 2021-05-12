# DnDBeyond Front End Developer Challenge Talent Calculator
This talent calculator is for a mock game called TitanStar Legends. Users of the application are able to spend up to 6 talent points across two talent trees.
Left click to select/add the talent, right click to remove it. Removing talents earlier in the tree will also remove subsequent talents down the tree and refund the appropriate amount of points.

The application is hosted on AWS using S3 and CloudFront and can be found here: https://d2t2gfrzsa7k9i.cloudfront.net/

### Local Development
Install node packages with ```npm i```

Run ```npm start``` to initiate a webpack-dev-server. Content will be hosted and hot-loaded on localhost:3000.

### Testing
The application was developed using Test Driven Development (TDD) using jest and Enzyme. Enzyme has yet to release an official adapter for React 17, so an unofficial Enzyme adapter was used instead.

Tests are located under the `__tests__` directory, mimicking the same directory structure as `app`. Test naming convention used is `<componentUnderTest>.spec.jsx`.

Automocking is turned on by default. Components under test and utility dependencies will need to be manually unmocked using `jest.unmock("name-of-module")`.

### Deployment
The Javascript files are packaged and bundled using webpack. Run ```npm run-script build``` to execute a webpack build which will generate assets, bundled JS, CSS, and an ```index.html``` with appropriate references.

A CloudFormation yaml that builds AWS CodePipeline, CodeBuild, S3 bucket, and CloudFront resources is located at deploy/cloudformation.yml. The defined resource stack will create a pipeline to listen for GitHub changes to this repo, initiate a pipeline to build the app, and deploy the assets to an S3 bucket fronted by CloudFront for caching.
I have not registered any domain to front the application, so the hosted URL is direct to CloudFront: https://d2t2gfrzsa7k9i.cloudfront.net/


### Assumptions
I was unable to find the exact font used in the mockups. I've decided to use Trebuchet MS as a baseline with sans-serif fallback since that renders the closest on my Windows machine.

Since the mockup was an image, and therefore a victim of compression artifacts and sizing issues, I've done my best to make sizing and colors approximately correct via eyedropping.

The mockup also only displayed a single size - I've made this implementation responsive to browser viewport instead of matching the exact size. The talents will switch to columns based on the $smBreakpoint defined in app/mixins.scss.

The mockup also had an inconsistency with the divider between talents - Talent Path 1 in the mockup indicates that the divider should become lighter when the previous talent is selected, while talent tree 2 indicates that it should be lighter when it is between two selected talents. I've decided to  style the app after Talent Path 1 as I believe that provides a better user experience.

