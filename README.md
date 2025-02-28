GIT
//! git hub     ==git init hten this add this git to git hub as follow
//!  git add .  and commit -m "firts commet"
//! git remote add origin https://github.com/gkebede/ECNMembers.git  to the new repositery ECNMembers
//! git push master however maser is changed to main use main 
// todo if ther is any kind of issues use -> git pull --rebase origin main ->git push origin main    ====
// command
//! VERY IMPORTANT
 //TODO dotnet 
 //Steps to Fix "ASP.NET Core Developer Certificate is Not Trusted":
 // dev-certs https --trust  (to trust the certificate)
 // dev-certs https --clean  (to clean the certificate)


//! CREATING A NEW REACT PROJECT USING .Net Core 9 and react 19
// todo   ====  THE PROJECT SETEPS START HERE

   //! *** 1) Download 
      //Download .NET .net9
      //Download nodejs.org  using NVM
      //extensions for vsCode-- C# Dev kit,  material Icon Theme, NuGet Gallery, react(ES7, React/Redux/GraphQL/React-Native snippets),
      //  eslint, prettier, vscode-icons, vscode-styled-components, vscode-styled-jsx, vscode-styled-jsx-languageserver, vscode-styled-jsx-snippets
   //! *** 2) Creating DONTET SPECIFIC STEPS      
   // todo   ==== PROJECT Creating SETEPS 
      // dotnet --info
      //a- dotnet new sln,,, 
      //b--~~start up Project~~ dotnet new webapi -n API -controllers,,,
      //c-- class libreries~~ dotnet new classlib -n Domain,,, Application and Persistence
   //! 3) adding the projects to the solution
       // dotnet sln  add API, Domain, Application, Persistence (ADD IT ONE BY ONE)
   //! 4) adding reference projects to the project
      // |NB.... once you created any C# project using vsCode make sure add the project to the solution as follow
      //       ... creating a project   ---      dotnet new classlib -n Infrastructure
      //       ... add to the sln       ---      dotnet sln add  Infrastructure
      //       and if this class need to reference any project cd to project and add the reference project as follow
      //       ---C:\Users\ghail\projects\ECNActivities   cd to C:\Users\ghail\projects\ECNActivities\Infrastructure> then after
      //       ---C:\Users\ghail\projects\ECNActivities\Infrastructure>dotnet add reference ../Application/ECNActivities.Application.csproj

   //! 5) installing the packages - ASP.NETCORE to the approprate projects   i.e   Microsoft.EntityFrameworkCore
      //1- dotnet add package Microsoft.EntityFrameworkCore.SqlServer   ---for SqlServer ~~ (for persistence projects)
      //2- dotnet add package Microsoft.EntityFrameworkCore.Design                 ---for Design   ~~ (for persistence API)
      //3- mediatonR  ---dotnet add package MediatR.Extensions.Microsoft.DependencyInjection  ~~ (for Application)
      //4- AutoMapper ---dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection  ~~ (for Application)
      //============
      // 1- Microsoft.EntityFrameworkCore                        ---for Identity
      // 2- Microsoft.EntityFrameworkCore.Relational             ---for Relational
      // 3- Microsoft.EntityFrameworkCore.Design                 ---for Design
      // 4- Microsoft.EntityFrameworkCore.SqlServer              ---for SqlServer
      // 5- Microsoft.EntityFrameworkCore.Tools                  ---for Tools
      // 6- dotnet add package FluentValidation.AspNetCore       ---for Validation
      // 7- System.IdentityModel.Tokens.Jwt @Microsoft           ---for IdentityModel (to create token)
      // 8- Microsoft.AspNetCore.Authentication.JwtBearer        ---to Authentication User to /API/
      // 9- install CloudinaryDotNet 
      // todo  5-a)   ==== after installing the packages
      // 1- dotnet restore
      // 2- dotnet build  
      

    //! 6) eintity framework migration  -- after creating the models and 
    //! adding the dbcontext to the services
        // we need entity framework tools to create the migration And they
        //  do not come with the framework or what we installed with the NuGet package.
        // so google  --    dotnet ef nuget  get the ff
        // then --install dotnet tool => --global dotnet-ef --version 9.0.1  globaly(API project)
        //     ---To add migrations  
        // todo 6-a)   ==== we need to go to up to soluton level i.e  cd to - ECNActivities and then
        //    =>dotnet ef migrations add InitialCreate -p Persistence -s API
        //    =>dotnet ef migrations add ActivityAttendee -p Persistence -s API
              // then dotnet build
        //        -p == project name -s == start up project 
         // todo 6-b)   ==== we must be  Persistence to the folders(swichies -s and -p) to drop or update the database
        //todo  ---(I.E) remove migrations  => dotnet ef database drop -s API -p Persistence
        //todo  ---(I.E) update migrations  => dotnet ef database update -s API -p Persistence
        // -- to drop database 
        //   Okay, Thank you!

    //! 7) creating react app
        // vite.dev--> npm create vite@latest clinet-app
             // cd clinet-app
            // npm install
           // npm run dev

        //npm create vite@latest + enter and select (Y)   and appName   and select framework react and seclect typescript + SWC (speedy web compiler)

    //! 8) installing react materical ui
        //mui.com
        // mui.com/getting-started/installation
        // npm install @mui/material @emotion/react @emotion/styled
        // npm install @fontsource/roboto   (ROBOTO FONT)
        // then === importing the css in to the index.tsx file  (main.tsx entry point of the react app)
        // install the icons  npm install @mui/icons-material

        // npm install -D vite=plugin-mkcert  (to install the mkcert plugin) for https to get local host certificate


        //! 9) installing axios instead of fetch
        // npm install axios
        
// todo   ====  THE PROJECT SETEPS END HERE



//1/ ---COMPONENTS start HERE-----

// dotnet watch --no-hot-reload
// NavBar  => App
// => App => ActivityDashboard } -ActivityList , ActivityListItem, ActivityForm
//1/ ----COMPONENTS end HERE-----


// TO GET THE SOURCE CODE USE THE FOLLOWING GIT URL ADRESS
// ==========================================================

//https://github1s.com/TryCatchLearn/Reactivities/blob/main/Persistence/Migrations/20221204055302_PostgresInitial.cs

//? 1 st Install Better Comments  and then the code below
// ! "=1.../** abc*/  =2...// !PACKAGES    =3...// todo: npm create    =4...//?"
/**  STEPS TO REMEMBER FOR DATA FLOW.. */  
 
// Add the DOBCONTEXT, IDENTIY, ADDsCOPED TOKEN in to programe class

// !PACKAGES and LIBRARIES   - react
 
// todo   *** npm create vite@latest my-vue-app
//?    N.B  - each JSX.Element(like App(), LoginForm(), ...) need some kind of model(modelObject) to display example check all
//            the interfaces in side models folders && when it is necessary create a model for one component if we think we
//            don't use it anywhere else example ModalStore class interface
// 1.mobx-react-lite      ---npm install --save mobx
// 2.react-toastify       ---npm install --save react-toastify
// 3.react-router         ---npm install react-router@6 react-router-dom@6
// 4.semantic-ui-react    ---npm install semantic-ui-react semantic-ui-css
// 5.axios                ---npm install axios
// 6.formik               ---npm install formik
// 7.yup                  ---npm install yup   and then  npm install @types/yup --save-dev
// 8.datepicker           ---npm install react-datepicker and then npm install @types/react-datepicker --save-dev
// 9.datefns              ---npm install date-fns@2.16.1 (i.e the right version # by checking npm ls date-fns)



//?--PASSWORD GENERATOR(URL)    ---https://passwordgenerator.net/
