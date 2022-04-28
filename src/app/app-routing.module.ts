import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ItemDetailPage } from './item-detail/item-detail.page';
import { ProfilePage } from './profile/profile.page';
import { UserCartPage } from './user-cart/user-cart.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splach',
    pathMatch: 'full'
  },


  
  {
    path :"article/id",
    component: UserCartPage

  },

  {
    path :"profile",
    component: ProfilePage

  },

  {
    path :"item-detail/:id",
    component: ItemDetailPage

  },




  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'user-cart',
    loadChildren: () => import('./user-cart/user-cart.module').then( m => m.UserCartPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'item-detail/:id',
    loadChildren: () => import('./item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'category/:id',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'splach',
    loadChildren: () => import('./splach/splach.module').then( m => m.SplachPageModule)
  },
  {
    path: 'payement',
    loadChildren: () => import('./payement/payement.module').then( m => m.PayementPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'commande',
    loadChildren: () => import('./commande/commande.module').then( m => m.CommandePageModule)
  },
  {
    path: 'succes',
    loadChildren: () => import('./succes/succes.module').then( m => m.SuccesPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'sub-category',
    loadChildren: () => import('./sub-category/sub-category.module').then( m => m.SubCategoryPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'notif',
    loadChildren: () => import('./notif/notif.module').then( m => m.NotifPageModule)
  },
  {
    path: 'promo',
    loadChildren: () => import('./promo/promo.module').then( m => m.PromoPageModule)
  },
  {
    path: 'best-sell',
    loadChildren: () => import('./best-sell/best-sell.module').then( m => m.BestSellPageModule)
  },
  {
    path: 'acheter/:id',
    loadChildren: () => import('./acheter/acheter.module').then( m => m.AcheterPageModule)
  },
  {
    path: 'livraison-en-cour',
    loadChildren: () => import('./livraison-en-cour/livraison-en-cour.module').then( m => m.LivraisonEnCourPageModule)
  },
  {
    path: 'livraison-valide',
    loadChildren: () => import('./livraison-valide/livraison-valide.module').then( m => m.LivraisonValidePageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
