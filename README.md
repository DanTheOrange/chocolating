# Chocolating

## Planned pages

List of pages in creation order. Usually because there is a dependency of data

- [] indredients management page
- [] chocolate recipe tool
- [] batch size calculator

## Investigation

### Nutrition APIs

Most are expensive or limited in their free nature, I'll do an extremely basic thing myself. We won't need many ingredients anyway.

- [nutritionix](https://www.nutritionix.com/business/api) (limited, expensive if you pay, seemingly unreasonable)
- [FatSecret](https://platform.fatsecret.com/api/) (To use it you can't just play - you have to host, expensive)

### Stock images

https://www.pexels.com/ was near the top on google...
https://icons8.com/icons/set/chocolate Favico is from here

# From the T3 default readme

## How do I deploy this?

### Vercel

We recommend deploying to [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). It makes it super easy to deploy NextJs apps.

- Push your code to a GitHub repository.
- Go to [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) and sign up with GitHub.
- Create a Project and import the repository you pushed your code to.
- Add your environment variables.
- Click **Deploy**
- Now whenever you push a change to your repository, Vercel will automatically redeploy your website!

### Docker

You can also dockerize this stack and deploy a container. See the [Docker deployment page](https://create-t3-app-nu.vercel.app/en/deployment/docker) for details.

## Useful resources

Here are some resources that we commonly refer to:

- [Protecting routes with Next-Auth.js](https://next-auth.js.org/configuration/nextjs#unstable_getserversession)
