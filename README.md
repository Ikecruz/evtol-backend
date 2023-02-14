## EVTOL BACKEND
This is a platform for evtol management.
Evtol is an electrical vertical takeoff an landing vehicle used as a means of transporting medications to areas with difficult access

## Project Support Features

* One one admin is allowed
* Authenticated admin can access available evtols as well send request for delivery using a particular evtol
* Admin can register evtol as well as edit and delete evtols.
* Admin login details `Email: ikedinobicruz7@gmail.com, Password: ikecruz`


## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Softwares needed and how to install them.
* pnpm
  ```sh
  npm install -g pnpm
  ```

### Installation

_Installing and setting up your app_.


1. Clone the repo
   ```sh
   git clone https://github.com/Ikecruz/evtol-backend.git
   ```
2. Install NPM packages
   ```sh
    pnpm install
   ```
3. Create and enter the required enviroment variables in `.env`
   ```sh
    API_KEY='ENTER YOUR API';
    LOG_FORMAT=dev
    LOG_DIR=../logs

    PORT=3010
    JWT_SECRET_KEY=''
    JWT_EXPIRES_IN=1d

    CLOUDINARY_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    DATABASE_URL=
   ```

## Usage



_Please refer to the [Documentation](https://documenter.getpostman.com/view/17630585/2s935uGLNn)_