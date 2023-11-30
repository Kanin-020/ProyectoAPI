var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"/login","pathMatch":"full"},{"path":"login","component":"LoginComponent"},{"path":"register","component":"RegisterComponent"},{"path":"account-settings","component":"AccountSettingsComponent"},{"path":"about-us","component":"AboutUsComponent"},{"path":"admin-landpage","canActivate":["SessionGuard","RoleGuard"],"component":"AdminLandpageComponent"},{"path":"admin-project-creator","canActivate":["SessionGuard","RoleGuard"],"component":"ProjectCreatorComponent"},{"path":"admin-project-modifier/:projectId","canActivate":["SessionGuard","RoleGuard"],"component":"ProjectModifierComponent"},{"path":"admin-task-creator/:projectId","canActivate":["SessionGuard","RoleGuard"],"component":"TaskCreatorComponent"},{"path":"admin-task-modifier/:taskId","canActivate":["SessionGuard","RoleGuard"],"component":"TaskModifierComponent"},{"path":"admin-task-manager/:projectId","canActivate":["SessionGuard","RoleGuard"],"component":"TaskManagerComponent"},{"path":"admin-user-manager/:projectId","canActivate":["SessionGuard","RoleGuard"],"component":"UserManagerComponent"},{"path":"user-landpage","canActivate":["SessionGuard","RoleGuard"],"component":"UserLandpageComponent"},{"path":"user-task-details/:taskId","canActivate":["SessionGuard","RoleGuard"],"component":"TaskDetailsComponent"},{"path":"user-task-archive","canActivate":["SessionGuard","RoleGuard"],"component":"TaskArchiveComponent"},{"path":"user-support","canActivate":["SessionGuard","RoleGuard"],"component":"SupportComponent"},{"path":"**","redirectTo":"/login","pathMatch":"full"}],"kind":"module"}]}
