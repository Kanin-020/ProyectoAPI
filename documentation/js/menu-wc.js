'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">spa documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-17574c733f3378b88a0017f01a43e2c0443736f49a789b04c55e2438e3e506e949f2a70b2a5123d8d1cbb9c8a3bf0bdc450f091275a0ddd4babcdc016d132ec9"' : 'data-bs-target="#xs-components-links-module-AppModule-17574c733f3378b88a0017f01a43e2c0443736f49a789b04c55e2438e3e506e949f2a70b2a5123d8d1cbb9c8a3bf0bdc450f091275a0ddd4babcdc016d132ec9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-17574c733f3378b88a0017f01a43e2c0443736f49a789b04c55e2438e3e506e949f2a70b2a5123d8d1cbb9c8a3bf0bdc450f091275a0ddd4babcdc016d132ec9"' :
                                            'id="xs-components-links-module-AppModule-17574c733f3378b88a0017f01a43e2c0443736f49a789b04c55e2438e3e506e949f2a70b2a5123d8d1cbb9c8a3bf0bdc450f091275a0ddd4babcdc016d132ec9"' }>
                                            <li class="link">
                                                <a href="components/AboutUsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutUsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccountSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminLandpageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminLandpageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectCreatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectCreatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectModifierComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectModifierComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SupportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskArchiveComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskArchiveComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskCreatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskCreatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskModifierComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskModifierComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserLandpageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserLandpageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserManagerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-17574c733f3378b88a0017f01a43e2c0443736f49a789b04c55e2438e3e506e949f2a70b2a5123d8d1cbb9c8a3bf0bdc450f091275a0ddd4babcdc016d132ec9"' : 'data-bs-target="#xs-injectables-links-module-AppModule-17574c733f3378b88a0017f01a43e2c0443736f49a789b04c55e2438e3e506e949f2a70b2a5123d8d1cbb9c8a3bf0bdc450f091275a0ddd4babcdc016d132ec9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-17574c733f3378b88a0017f01a43e2c0443736f49a789b04c55e2438e3e506e949f2a70b2a5123d8d1cbb9c8a3bf0bdc450f091275a0ddd4babcdc016d132ec9"' :
                                        'id="xs-injectables-links-module-AppModule-17574c733f3378b88a0017f01a43e2c0443736f49a789b04c55e2438e3e506e949f2a70b2a5123d8d1cbb9c8a3bf0bdc450f091275a0ddd4babcdc016d132ec9"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExcelService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExcelService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PdfService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PdfService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CommentService.html" data-type="entity-link" >CommentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcelService.html" data-type="entity-link" >ExcelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PdfService.html" data-type="entity-link" >PdfService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectService.html" data-type="entity-link" >ProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RelationsCommentsService.html" data-type="entity-link" >RelationsCommentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RelationsProjectsService.html" data-type="entity-link" >RelationsProjectsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SessionGuard.html" data-type="entity-link" >SessionGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Comment.html" data-type="entity-link" >Comment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Project.html" data-type="entity-link" >Project</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Relation.html" data-type="entity-link" >Relation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});