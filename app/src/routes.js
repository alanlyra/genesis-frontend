import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from "./components/Loader/Loader";
import AdminLayout from "./layouts/AdminLayout";

import GuestGuard from "./components/Auth/GuestGuard";
import AuthGuard from "./components/Auth/AuthGuard";

import { BASE_URL } from "./config/constant";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    guard: GuestGuard,
    path: '/auth/signin-1',
    component: lazy(() => import('./views/auth/signin/SignIn1'))
  },  
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./views/errors/NotFound404'))
  },
  {
    exact: true,
    path: '/maintenance/coming-soon',
    component: lazy(() => import('./views/maintenance/ComingSoon'))
  },
  {
    exact: true,
    path: '/maintenance/error',
    component: lazy(() => import('./views/maintenance/Error'))
  },
  {
    exact: true,
    path: '/maintenance/offline-ui',
    component: lazy(() => import('./views/maintenance/OfflineUI'))
  },
  {
    exact: true,
    path: '/auth/signup-1',
    component: lazy(() => import('./views/auth/signup/SignUp1')),
  },
  {
    exact: true,
    path: '/auth/signup-2',
    component: lazy(() => import('./views/auth/signup/SignUp2'))
  },
  {
    exact: true,
    path: '/auth/signup-3',
    component: lazy(() => import('./views/auth/signup/SignUp3'))
  },
  {
    exact: true,
    path: '/auth/signup-4',
    component: lazy(() => import('./views/auth/signup/SignUp4'))
  },
  {
    exact: true,
    path: '/auth/signup-5',
    component: lazy(() => import('./views/auth/signup/SignUp5'))
  },
  {
    exact: true,
    path: '/auth/signin-2',
    component: lazy(() => import('./views/auth/signin/SignIn2'))
  },
  {
    exact: true,
    path: '/auth/signin-3',
    component: lazy(() => import('./views/auth/signin/SignIn3'))
  },
  {
    exact: true,
    path: '/auth/signin-4',
    component: lazy(() => import('./views/auth/signin/SignIn4'))
  },
  {
    exact: true,
    path: '/auth/signin-5',
    component: lazy(() => import('./views/auth/signin/SignIn5'))
  },
  {
    exact: true,
    path: '/auth/reset-password-1',
    component: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  },
  {
    exact: true,
    path: '/auth/reset-password-2',
    component: lazy(() => import('./views/auth/reset-password/ResetPassword2'))
  },
  {
    exact: true,
    path: '/auth/reset-password-3',
    component: lazy(() => import('./views/auth/reset-password/ResetPassword3'))
  },
  {
    exact: true,
    path: '/auth/reset-password-4',
    component: lazy(() => import('./views/auth/reset-password/ResetPassword4'))
  },
  {
    exact: true,
    path: '/auth/reset-password-5',
    component: lazy(() => import('./views/auth/reset-password/ResetPassword5'))
  },
  {
    exact: true,
    path: '/auth/change-password',
    component: lazy(() => import('./views/auth/ChangePassword'))
  },
  {
    exact: true,
    path: '/auth/profile-settings',
    component: lazy(() => import('./views/auth/ProfileSettings'))
  },
  {
    exact: true,
    path: '/auth/tabs-auth',
    component: lazy(() => import('./views/auth/TabsAuth'))
  },
  {
    exact: true,
    path: '/auth/map-form',
    component: lazy(() => import('./views/auth/MapForm'))
  },
  {
    exact: true,
    path: '/auth/subscribe',
    component: lazy(() => import('./views/auth/Subscribe'))
  },
  {
    exact: true,
    path: '/landing',
    component: lazy(() => import('./views/landing'))
  },
  {
    path: '*',
    layout: AdminLayout,
    guard: AuthGuard,
    routes: [
      //Páginas do GENESIS
      {
        exact: true,
        path: '/home',
        component: lazy(() => import('./GENESIS/views/Home'))
      },
      {
        exact: true,
        path: '/documents/:_id',
        component: lazy(() => import('./GENESIS/views/Documents'))
      },
      {
        exact: true,
        path: '/projects',
        component: lazy(() => import('./GENESIS/views/Projects'))
      },
      {
        exact: true,
        path: '/roadmap/project/:_id',
        component: lazy(() => import('./GENESIS/views/Roadmaps'))
      },
      {
        exact: true,
        path: '/roadmap/document/:_id',
        component: lazy(() => import('./GENESIS/views/Roadmaps'))
      },{
        exact: true,
        path: '/bibliometrics/:_id',
        component: lazy(() => import('./GENESIS/views/Bibliometrics'))
      },
      {
        exact: true,
        path: '/scenarios/project/:_id',
        component: lazy(() => import('./GENESIS/views/Scenarios'))
      },
      {
        exact: true,
        path: '/scenarios/document/:_id',
        component: lazy(() => import('./GENESIS/views/Scenarios'))
      },
      //Páginas padrões do template
      {
        exact: true,
        path: '/app/dashboard/default',
        component: lazy(() => import('./views/dashboard/DashDefault'))
      },
      {
        exact: true,
        path: '/app/dashboard/e-commerce',
        component: lazy(() => import('./views/dashboard/DashEcommerce'))
      },
      {
        exact: true,
        path: '/app/dashboard/crm',
        component: lazy(() => import('./views/dashboard/DashCrm'))
      },
      {
        exact: true,
        path: '/app/dashboard/analytics',
        component: lazy(() => import('./views/dashboard/DashAnalytics'))
      },
      {
        exact: true,
        path: '/app/dashboard/crypto',
        component: lazy(() => import('./views/dashboard/DashCrypto'))
      },
      {
        exact: true,
        path: '/app/dashboard/project',
        component: lazy(() => import('./views/dashboard/DashProject'))
      },
      {
        exact: true,
        path: '/app/widgets/widget-statistic',
        component: lazy(() => import('./views/widgets/WidgetStatistic'))
      },
      {
        exact: true,
        path: '/app/widgets/widget-data',
        component: lazy(() => import('./views/widgets/WidgetData'))
      },
      {
        exact: true,
        path: '/app/widgets/widget-table',
        component: lazy(() => import('./views/widgets/WidgetTable'))
      },
      {
        exact: true,
        path: '/app/widgets/widget-user',
        component: lazy(() => import('./views/widgets/WidgetUser'))
      },
      {
        exact: true,
        path: '/app/widgets/widget-chart',
        component: lazy(() => import('./views/widgets/WidgetChart'))
      },
      {
        exact: true,
        path: '/layout/vertical/static',
        component: lazy(() => import('./views/page-layouts/vertical/Static'))
      },
      {
        exact: true,
        path: '/layout/vertical/fixed',
        component: lazy(() => import('./views/page-layouts/vertical/Fixed'))
      },
      {
        exact: true,
        path: '/layout/vertical/nav-fixed',
        component: lazy(() => import('./views/page-layouts/vertical/NavFixed'))
      },
      {
        exact: true,
        path: '/layout/vertical/collapse-menu',
        component: lazy(() => import('./views/page-layouts/vertical/CollapseMenu'))
      },
      {
        exact: true,
        path: '/layout/vertical/v-rtl',
        component: lazy(() => import('./views/page-layouts/vertical/RTLLayout'))
      },
      {
        exact: true,
        path: '/layout/horizontal',
        component: lazy(() => import('./views/page-layouts/horizontal/Static'))
      },
      {
        exact: true,
        path: '/layout/horizontal-v2',
        component: lazy(() => import('./views/page-layouts/horizontal/Static-v2'))
      },
      {
        exact: true,
        path: '/layout/horizontal-rtl',
        component: lazy(() => import('./views/page-layouts/horizontal/RTLLayout'))
      },
      {
        exact: true,
        path: '/layout/box',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Box'))
      },
      {
      exact: true,
        path: '/layout/light',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Light'))
      },
      {
        exact: true,
        path: '/layout/dark',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Dark'))
      },
      {
        exact: true,
        path: '/layout/color-icon',
        component: lazy(() => import('./views/page-layouts/extra-layouts/ColorIcon'))
      },
      {
        exact: true,
        path: '/layout/nav-color',
        component: lazy(() => import('./views/page-layouts/extra-layouts/NavColor'))
      },
      {
        exact: true,
        path: '/layout/layout-2',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Layout-2'))
      },
      {
        exact: true,
        path: '/layout/layout-2-2',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Layout-22'))
      },
      {
        exact: true,
        path: '/layout/layout-3',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Layout-3'))
      },
      {
        exact: true,
        path: '/layout/layout-4',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Layout-4'))
      },
      {
        exact: true,
        path: '/layout/layout-4-2',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Layout-42'))
      },
      {
        exact: true,
        path: '/layout/layout-5h',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Layout-5h'))
      },
      {
        exact: true,
        path: '/layout/layout-6',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Layout-6'))
      },
      {
        exact: true,
        path: '/layout/layout-8',
        component: lazy(() => import('./views/page-layouts/extra-layouts/Layout-8'))
      },
      {
        exact: true,
        path: '/users/user-profile',
        component: lazy(() => import('./views/users/UserProfile'))
      },
      {
        exact: true,
        path: '/users/user-cards',
        component: lazy(() => import('./views/users/UserCard'))
      },
      {
        exact: true,
        path: '/users/user-list',
        component: lazy(() => import('./views/users/UserList'))
      },
      {
        exact: true,
        path: '/basic/alert',
        component: lazy(() => import('./views/ui-elements/basic/BasicAlert'))
      },
      {
        exact: true,
        path: '/basic/button',
        component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: true,
        path: '/basic/badges',
        component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: true,
        path: '/basic/breadcrumb',
        component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: true,
        path: '/basic/pagination',
        component: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
      },
      {
        exact: true,
        path: '/basic/cards',
        component: lazy(() => import('./views/ui-elements/basic/BasicCards'))
      },
      {
        exact: true,
        path: '/basic/collapse',
        component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: true,
        path: '/basic/carousel',
        component: lazy(() => import('./views/ui-elements/basic/BasicCarousels'))
      },
      {
        exact: true,
        path: '/basic/grid-system',
        component: lazy(() => import('./views/ui-elements/basic/BasicGridSystem'))
      },
      {
        exact: true,
        path: '/basic/progress',
        component: lazy(() => import('./views/ui-elements/basic/BasicProgress'))
      },
      {
        exact: true,
        path: '/basic/modal',
        component: lazy(() => import('./views/ui-elements/basic/BasicModals'))
      },
      {
        exact: true,
        path: '/basic/spinner',
        component: lazy(() => import('./views/ui-elements/basic/BasicSpinner'))
      },
      {
        exact: true,
        path: '/basic/tabs-pills',
        component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: true,
        path: '/basic/typography',
        component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      { 
        exact: true,
        path: '/basic/tooltip',
        component: lazy(() => import('./views/ui-elements/basic/BasicTooltips'))
      },
      { 
        exact: true,
        path: '/basic/popovers',
        component: lazy(() => import('./views/ui-elements/basic/BasicPopovers'))
      },
      {
        exact: true,
        path: '/basic/other',
        component: lazy(() => import('./views/ui-elements/basic/BasicOther'))
      },
      {
        exact: true,
        path: '/advance/sweet-alert',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceAlert'))
      },
      {
        exact: true,
        path: '/advance/datepicker',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceDatepicker'))
      },
      {
        exact: true,
        path: '/advance/task-board',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceTaskBoard'))
      },
      {
        exact: true,
        path: '/advance/light-box',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceLightBox'))
      },
      {
        exact: true,
        path: '/advance/adv-modal',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceModal'))
      },
      {
        exact: true,
        path: '/advance/notification',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceNotification'))
      },
      {
        exact: true,
        path: '/advance/nestable',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceNestable'))
      },
      {
        exact: true,
        path: '/advance/p-notify',
        component: lazy(() => import('./views/ui-elements/advance/AdvancePNotify'))
      },
      {
        exact: true,
        path: '/advance/rating',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceRating'))
      },
      {
        exact: true,
        path: '/advance/range-slider',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceRangeSlider'))
      },
      {
        exact: true,
        path: '/advance/slider',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceSlider'))
      },
      {
        exact: true,
        path: '/advance/syntax-highlighter',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceSyntaxHighlighter'))
      },
      {
        exact: true,
        path: '/advance/tour',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceTour'))
      },
      {
        exact: true,
        path: '/advance/tree-view',
        component: lazy(() => import('./views/ui-elements/advance/AdvanceTree'))
      },
      {
        exact: true,
        path: '/forms/form-basic',
        component: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: true,
        path: '/forms/form-advance',
        component: lazy(() => import('./views/forms/FormsAdvance'))
      },
      {
        exact: true,
        path: '/forms/form-validation',
        component: lazy(() => import('./views/forms/FormsValidation'))
      },
      {
        exact: true,
        path: '/forms/form-masking',
        component: lazy(() => import('./views/forms/FormsMasking'))
      },
      {
        exact: true,
        path: '/forms/form-wizard',
        component: lazy(() => import('./views/forms/FormsWizard'))
      },
      {
        exact: true,
        path: '/forms/form-picker',
        component: lazy(() => import('./views/forms/FormsPicker'))
      },
      {
        exact: true,
        path: '/forms/form-select',
        component: lazy(() => import('./views/forms/FormsSelect'))
      },
      {
        exact: true,
        path: '/tables/bootstrap',
        component: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: true,
        path: '/table/datatable/tbl-basic',
        component: lazy(() => import('./views/tables/react-table/Basic'))
      },
      {
        exact: true,
        path: '/table/datatable/tbl-footer',
        component: lazy(() => import('./views/tables/react-table/Footers'))
      },
      {
        exact: true,
        path: '/table/datatable/tbl-sorting',
        component: lazy(() => import('./views/tables/react-table/Sorting'))
      },
      {
        exact: true,
        path: '/table/datatable/tbl-filtering',
        component: lazy(() => import('./views/tables/react-table/Filtering'))
      },
      {
        exact: true,
        path: '/table/datatable/tbl-grouping',
        component: lazy(() => import('./views/tables/react-table/Grouping'))
      },
      {
        exact: true,
        path: '/table/datatable/tbl-pagination',
        component: lazy(() => import('./views/tables/react-table/Pagination'))
      },
      {
        exact: true,
        path: '/charts/amchart',
        component: lazy(() => import('./views/charts/am-chart'))
      },
      {
        exact: true,
        path: '/charts/apex-chart',
        component: lazy(() => import('./views/charts/apex-chart'))
      },
      {
        exact: true,
        path: '/charts/chart-js',
        component: lazy(() => import('./views/charts/chart-js'))
      },
      {
        exact: true,
        path: '/charts/e-chart',
        component: lazy(() => import('./views/charts/e-chart'))
      },
      {
        exact: true,
        path: '/charts/google-chart',
        component: lazy(() => import('./views/charts/google-chart'))
      },
      {
        exact: true,
        path: '/charts/highchart',
        component: lazy(() => import('./views/charts/highchart'))
      },
      {
        exact: true,
        path: '/charts/rechart',
        component: lazy(() => import('./views/charts/re-chart'))
      },
      {
        exact: true,
        path: '/charts/nvd3',
        component: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: true,
        path: '/charts/radial',
        component: lazy(() => import('./views/charts/radial-chart'))
      },
      {
        exact: true,
        path: '/maps/google-map',
        component: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: true,
        path: '/maps/vector-map',
        component: lazy(() => import('./views/maps/VectorMaps'))
      },
      {
        exact: true,
        path: '/todo/todo-basic',
        component: lazy(() => import('./views/applications/to-do/ToDo'))
      },
      {
        exact: true,
        path: '/message',
        component: lazy(() => import('./views/applications/message'))
      },
      {
        exact: true,
        path: '/task/task-list',
        component: lazy(() => import('./views/applications/task/TaskList'))
      },
      {
        exact: true,
        path: '/task/task-board',
        component: lazy(() => import('./views/applications/task/TaskBoard'))
      },
      {
        exact: true,
        path: '/task/task-detail',
        component: lazy(() => import('./views/applications/task/TaskDetails'))
      },
      {
        exact: true,
        path: '/gallery/gallery-grid',
        component: lazy(() => import('./views/applications/gallery/GalleryGrid'))
      },
      {
        exact: true,
        path: '/gallery/photo-grid',
        component: lazy(() => import('./views/applications/gallery/PhotoGrid'))
      },
      {
        exact: true,
        path: '/gallery/gallery-masonry',
        component: lazy(() => import('./views/applications/gallery/MasonryGallery'))
      },
      {
        exact: true,
        path: '/gallery/gallery-advance',
        component: lazy(() => import('./views/applications/gallery/GalleryAdvance'))
      },
      {
        exact: true,
        path: '/editor/ck-editor/ck-classic',
        component: lazy(() => import('./views/extensions/editors/ck-editor/EditorCkClassic'))
      },
      {
        exact: true,
        path: '/editor/ck-editor/ck-balloon',
        component: lazy(() => import('./views/extensions/editors/ck-editor/EditorCkBalloon'))
      },
      {
        exact: true,
        path: '/editor/ck-editor/ck-inline',
        component: lazy(() => import('./views/extensions/editors/ck-editor/EditorCkInline'))
      },
      {
        exact: true,
        path: '/editor/ck-editor/ck-document',
        component: lazy(() => import('./views/extensions/editors/ck-editor/EditorCkDocument'))
      },
      {
        exact: true,
        path: '/editor/rich-editor',
        component: lazy(() => import('./views/extensions/editors/EditorRichNib'))
      },
      {
        exact: true,
        path: '/editor/jodit-wysiwyg',
        component: lazy(() => import('./views/extensions/editors/EditorJoditWYSIWYG'))
      },
      {
        exact: true,
        path: '/image-cropper',
        component: lazy(() => import('./views/extensions/ImageCropper'))
      },
      {
        exact: true,
        path: '/file-upload',
        component: lazy(() => import('./views/extensions/FileUpload'))
      },
      {
        exact: true,
        path: '/full-calendar',
        component: lazy(() => import('./views/extensions/FullEventCalendar'))
      },
      {
        exact: true,
        path: '/invoice/invoice-basic',
        component: lazy(() => import('./views/extensions/invoice/InvoiceBasic'))
      },
      {
        exact: true,
        path: '/invoice/invoice-summary',
        component: lazy(() => import('./views/extensions/invoice/InvoiceSummary'))
      },
      {
        exact: true,
        path: '/invoice/invoice-list',
        component: lazy(() => import('./views/extensions/invoice/InvoiceList'))
      },
      {
        exact: true,
        path: '/sample-page',
        component: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: true,
        component: () => <Redirect to={BASE_URL}/>
      }
    ]
  }
];

export default routes;
