<template>
  <v-app id="inspire">
    <!-- Left side navigation drawer -->
    <v-navigation-drawer v-if="userIsAuthenticated" v-model="drawer" fixed app>
      <!-- Material background -->
      <v-img :aspect-ratio="16/9" :src="require('@/assets/material.jpg')">
          <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
              <div class="subheading">{{ getUser.email }}</div>
              <div class="body-1">Administrator</div>
          </v-flex>
          </v-layout>
      </v-img>
      <v-list>
        <template v-for="(page, index) in pages">
            <v-divider v-if="page.divider" :key="index"></v-divider>
            <v-list-tile active-class="green--text" v-else :key="index" :to="{path: page.path}">
                <v-list-tile-action>
                    <v-icon>{{page.icon}}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="subheading font-weight-medium">{{page.title}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
        <v-list-tile @click="signOutDialog = true, drawer = false">
            <v-list-tile-action>
                <v-icon>input</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title class="subheading font-weight-medium">Sign Out</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- Top toolbar -->
    <v-toolbar color="green" :tabs="$route.path == '/sales'" dark fixed app>
        <v-toolbar-side-icon v-if="userIsAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
        <!-- Toolbar tabs header -->
        <template v-slot:extension v-if="$route.path == '/sales'">
          <v-tabs v-model="tab" fixed-tabs grow color="transparent">
            <!-- Active tab slider indicator -->
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <!-- List of tab items -->
            <v-tab v-for="item in tabItems" :key="item.id">
              &nbsp;<span>{{ item.name }}</span>
            </v-tab>
          </v-tabs>
        </template>
    </v-toolbar>
    <!-- Page content -->
    <v-content>
      <template v-if="$route.path == '/sales'">
        <!-- tabs content -->
        <v-tabs-items v-model="tab">
          <v-tab-item key="0">
            <v-card flat class="tab-item-wrapper">
              <daily-sales/>
            </v-card>
          </v-tab-item>
          <v-tab-item key="1">
            <v-card flat class="tab-item-wrapper">
              <monthly-sales/>
            </v-card>
          </v-tab-item>
          <v-tab-item key="3">
            <v-card flat class="tab-item-wrapper">
              <anually-sales/>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </template>
      <template v-else>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </template>
    </v-content>

    <!-- Signing out dialog -->
    <v-dialog v-model="signOutDialog" max-width="360">
      <v-card>
        <v-card-title class="headline">Signing Out</v-card-title>
        <v-card-text>
          <span class="subheading font-weight-regular">
            Are you sure do you want to sign out ?
          </span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" large flat="flat" @click="signOut">Yes</v-btn>
          <v-btn color="green darken-1" large flat="flat" @click="signOutDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
  import DailySales from '@/components/DailySales'
  import MonthlySales from '@/components/MonthlySales'
  import AnuallySales from '@/components/AnuallySales'

  export default {
    name: 'App',
    components: {
      DailySales, MonthlySales, AnuallySales
    },
    data: () => ({
      drawer: null,
      pages: [
        {title: "Dashboard",  icon: "dashboard",        path: "/"},
        {title: "Products",   icon: "business_center",  path: "/products"},
        {title: "Customers",  icon: "group",            path: "/customers"},
        {title: "Sales",      icon: "equalizer",        path: "/sales"},
        {divider: true },
        {title: "Settings",   icon: "settings",         path: "/settings"}
      ],
      tab: null,
      tabItems: [
        { id: 1, name: 'Daily',     icon: 'business_center'},
        { id: 2, name: 'Monthly',   icon: 'history'},
        { id: 3, name: 'Annually',    icon: 'history'}
      ],
      signOutDialog: false
    }),
    methods: {
      signOut() {
        this.signOutDialog = false
        this.$store.dispatch('unathenticate')
      }
    },
    computed: {
      userIsAuthenticated() {
        return this.$store.getters.getAuthUser !== null && this.$store.getters.getAuthUser !== undefined
      },
      getUser() {
        return this.$store.getters.getAuthUser
      }
    },
    watch: {
      userIsAuthenticated(val) {
        if (!val) this.$router.replace('/sign_in')
      }
    }
  }
</script>

<style scoped>
    .lightbox {
      box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
    }
    .v-tabs__slider {
      height: 4px;
    }
</style>