
import { Container } from "inversify";
import { axiosContainer } from "./container";
import { loginContainer } from "./shared/Login/container/loginContainer";
import { controllerContainer } from "./controller/config/container/controllerContainer";

const container = new Container()

container.load(axiosContainer)
container.load(loginContainer)
container.load(controllerContainer)

export {
  container
}