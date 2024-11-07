
import { Container } from "inversify";
import { axiosContainer } from "./container";
import { loginContainer } from "./views/Login/container/loginContainer";

const container = new Container()
container.load(axiosContainer)
container.load(loginContainer)

export {
  container
}