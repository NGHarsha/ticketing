import axios from "axios";

const app = ({ data }) => {
  console.log(data);
  return data.currentUser ? (
    <h1>You are Signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

// app.getInitialProps = async ({ req }) => {
//   console.log("Inside Index page initialprops");
//   if (typeof window === "undefined") {
//     //we are on the server. To be specific, SSR. Client service in kubernetes should request auth service for current user.
//     //We can use http://auth-srv/api/users/currentuser url to request auth-srv.
//     //But exposing specific service name is bad. Hence we can request Ingress service, which redirects the request to specific service.
//     //http://INGRESS_SERVICENAME.INGRESS_SERVICE_NAMESPACE.svc.cluster.local/..
//     //Ingress service only redirects requests if they are from ticketing.dev.
//     //Hence pass the domain in Host.
//     const res = await axios.get(
//       "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
//       {
//         headers: req.headers,
//       }
//     );
//     return res.data;
//   } else {
//     //we are on the browser/client
//     //request should be made with base url of  ""(empty string). Browser will replace the
//     //base url with current domain in window.
//     //Hence the request will be directed to ingress, which then redirects to specific service
//     //based on logic defined in ingress.
//     const res = await axios.get("/api/users/currentuser");
//     return res.data;
//   }
// };

export default app;
