import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

import Header from "../components/Header";

const global = ({ Component, pageProps, data }) => {
  return (
    <>
      <Header currentUser={data.currentUser} />
      <Component {...pageProps} data={data} />
    </>
  );
};

global.getInitialProps = async (appContext) => {
  console.log("Inside global initialprops", appContext.router.route);
  //console.log(appContext);
  let data = {};
  if (typeof window === "undefined") {
    //we are on the server. To be specific, SSR. Client service in kubernetes should request auth service for current user.
    //We can use http://auth-srv/api/users/currentuser url to request auth-srv.
    //But exposing specific service name is bad. Hence we can request Ingress service, which redirects the request to specific service.
    //http://INGRESS_SERVICENAME.INGRESS_SERVICE_NAMESPACE.svc.cluster.local/..
    //Ingress service only redirects requests if they are from ticketing.dev.
    //Hence pass the domain in Host.
    const res = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: appContext.ctx.req.headers,
      }
    );
    data = res.data;
  } else {
    //we are on the browser/client
    //request should be made with base url of  ""(empty string). Browser will replace the
    //base url with current domain in window.
    //Hence the request will be directed to ingress, which then redirects to specific service
    //based on logic defined in ingress.
    const res = await axios.get("/api/users/currentuser");
    data = res.data;
  }

  // let pageProps = {};
  // //When global getInitialProps is defined, page specific getInitialProps is not called.
  // //So, we get access to the getInitialProps method of the page being rendered and call it manually.\
  // //Check if getInitialProps is defined for the current page.
  // //If so, call it.
  // if (appContext.Component.getInitialProps) {
  //   pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  // }

  return { data };
};

export default global;
