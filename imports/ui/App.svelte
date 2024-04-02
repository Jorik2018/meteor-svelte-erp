<script lang="ts">
  import { Meteor } from "meteor/meteor";
  import { Router, Route, Link } from "svelte-navigator";
  import LazyRoute from "./Lazy.svelte";
  import { mdiAccount } from '@mdi/js';
  import { LinksCollection } from "../api/links";
  import { TasksCollection } from "../api/TasksCollection";
  import TaskForm from "./TaskForm.svelte";
  //import { Button } from 'flowbite-svelte';
  import Drawer, {
    AppContent,
    Content,
    Header,
    Title,
    Subtitle,
    Scrim,
  } from "@smui/drawer";
  import Button, { Icon, Label } from "@smui/button";
  import List, { Item, Text, Graphic, Separator, Subheader } from "@smui/list";
  import "svelte-material-ui/bare.css";
  //import "svelte-material-ui/themes/material-dark.css";

  const delayModuleLoad = module =>
    new Promise(res =>
      setTimeout(() => res(module), Math.random() * 2000),
    );
  const Home = () => import("./Home.svelte").then(delayModuleLoad);
  const About = () => import("./About.svelte").then(delayModuleLoad);
  const Blog = () => import("./Blog.svelte").then(delayModuleLoad);

  let open = false;
  let active = "Inbox";

  function setActive(value: string) {
    active = value;
    open = false;
  }

  let counter = 0;
  const addToCounter = () => {
    counter += 1;
  };

  let subIsReady = false;
  const handle = Meteor.subscribe("links.all");
  $m: {
    subIsReady = handle.ready();
  }

  // more information about $m at https://atmospherejs.com/zodern/melte#tracker-statements
  let links;
  $m: links = LinksCollection.find().fetch();

  let tasks;
  $m: tasks = TasksCollection.find().fetch();
</script>

<div class="drawer-container">
  <Drawer variant="modal" fixed={true} bind:open>
    <Header>
      <Title>Super Mail</Title>
      <Subtitle>It's the best fake mail app drawer.</Subtitle>
    </Header>
    <Content>
      
      <List>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("Inbox")}
          activated={active === "Inbox"}
        >
        
          <Graphic class="material-icons" aria-hidden="true"><Icon tag="svg" viewBox="0 0 24 24">
          <path d={mdiAccount} />
        </Icon></Graphic>
          <Text>Inbox</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("Star")}
          activated={active === "Star"}
        >
          <Graphic class="material-icons" aria-hidden="true">star</Graphic>
          <Text>Star</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("Sent Mail")}
          activated={active === "Sent Mail"}
        >
          <Graphic class="material-icons" aria-hidden="true">send</Graphic>
          <Text>Sent Mail</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("Drafts")}
          activated={active === "Drafts"}
        >
          <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
          <Text>Drafts</Text>
        </Item>

        <Separator />
        <Subheader tag="h6">Labels</Subheader>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("Family")}
          activated={active === "Family"}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Family</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("Friends")}
          activated={active === "Friends"}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Friends</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive("Work")}
          activated={active === "Work"}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Work</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <!-- Don't include fixed={false} if this is a page wide drawer.
        It adds a style for absolute positioning. -->
  <Scrim fixed={false} />
  <AppContent class="app-content">
    <main class="main-content">
      <Router>
      <Link to="/">Base</Link>
      <Link to="home">Home</Link>
      <Link to="about">About</Link>
      <Link to="blog">Blog</Link>
      <main>
        <!--
          When `delayMs` is set, the fallback will be displayed
          after `delayMs` milliseconds.
          It might lead to a better UX, because it will suppress
          a flash of spinners on a fast connection.
        -->
        <LazyRoute path="blog/*blogRoute" component={Blog} delayMs={500}>
          <h4>Loading...</h4>
        </LazyRoute>
        <LazyRoute path="home" component={Home} delayMs={500}>
          Loading Home...
        </LazyRoute>
        <LazyRoute path="about" component={About} delayMs={500}>
          Loading About...
        </LazyRoute>
        <Route>
          <h3>Default</h3>
          <p>No Route could be matched.</p>
        </Route>
      </main>
</Router>

      <Button on:click={() => (open = !open)}>
        <Label>Toggle Drawer</Label>
      </Button>
      <br />
      <pre class="status">Active: {active}</pre>
      <div style="height: 700px;">&nbsp;</div>
      And some stuff at the bottom.

      <Button on:click={addToCounter} variant="unelevated" color="primary">
        <Label>Unelevated</Label>
      </Button>
      <Button on:click={addToCounter} variant="unelevated" color="secondary">
        <Label>Unelevated</Label>
      </Button>
      <p>You've pressed the button {counter} times.</p>
      <h2>Learn Meteor!</h2>
      {#if subIsReady}
        <ul>
          {#each links as link (link._id)}
            <li>
              <a href={link.url} target="_blank" rel="noreferrer"
                >{link.title}</a
              >
            </li>
          {/each}
        </ul>
      {:else}
        <div>Loading ...</div>
      {/if}
      <h2>Typescript ready</h2>
      <p>Just add lang="ts" to .svelte components.</p>
      {#each tasks as link (link._id)}
        <li>
          <a href={link.text} target="_blank" rel="noreferrer">{link.text}</a>
        </li>
      {/each}
      <TaskForm></TaskForm>
    </main>
  </AppContent>
</div>

<style>
  /* These classes are only needed because the
    drawer is in a container on the page. */
  .drawer-container {
    position: relative;
    display: flex;
    height: -webkit-fill-available;
    max-width: 600px;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }
</style>
