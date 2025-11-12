import { createRouter, createWebHistory } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import HomePage from '../views/HomePage.vue'
import SecondPage from '../views/SecondPage.vue'
import AreaRiservata from '../views/AreaRiservata.vue'
import AreaOrganizzatore from '../views/area_riservata/AreaOrganizzatore.vue'
import EventiOrganizzatore from '../views/area_riservata/EventiOrganizzatore.vue'
import OrganizzatoreLogin from '../views/area_riservata/OrganizzatoreLogin.vue'
import OrganizzatoreRegistrati from '../views/area_riservata/OrganizzatoreRegistrati.vue'
import AggiungiEvento from '../views/area_riservata/AggiungiEvento.vue'
import AreaConvalidatore from '../views/area_riservata/AreaConvalidatore.vue'
import { getAuth } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
    {
        path: '/',
        name: "IndexView",
        component: IndexView
    },
    {
        path: '/home',
        name: "HomeView",
        component: HomePage
    },
    {
        path: '/secondpage',
        name: "SecondPage",
        component: SecondPage
    },
    {
        path: '/evento/:eventoId',
        name: "EventoView",
        component: () => import('../views/EventoView.vue'),
        props: true
    },
    {
        path: '/evento/:eventoId/:partecipanteId',
        name: "PartecipanteView",
        component: () => import('../views/PartecipanteView.vue'),
        props: true
    },
    {
        path: '/area-riservata',
        name: "AreaRiservata",
        component: AreaRiservata,
    },
    {
        path: "/area-riservata/area-organizzatore",
        name: "AreaOrganizzatore",
        component: AreaOrganizzatore,
        meta: { requiresAuth: true }
    },
    {
        path: "/area-riservata/area-organizzatore/eventi-organizzatore",
        name: "EventiOrganizzatore",
        component: EventiOrganizzatore
    },
    {
        path: "/area-riservata/organizzatore-login",
        name: "OrganizzatoreLogin",
        component: OrganizzatoreLogin
    }, 
    {
        path: "/area-riservata/organizzatore-registrati",
        name: "OrganizzatoreRegistrati",
        component: OrganizzatoreRegistrati
    },
    {
        path: "/area-riservata/area-organizzatore/aggiungi-evento",
        name: "AggiungiEvento",
        component: AggiungiEvento
    },
    {
        path: "/area-riservata/area-convalidatore",
        name: "AreaConvalidatore",
        component: AreaConvalidatore
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      user => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
    //const auth = getAuth();
    const user = await getCurrentUser()

    if(to.path.startsWith("/area-riservata/area-organizzatore") && !user) {
        next("/area-riservata/organizzatore-login")
    } 
    else if(to.path.startsWith("/area-riservata/organizzatore-login") && user) {
        next("/home")
    } else {
        next()
    }
})

export default router