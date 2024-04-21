import { Box, CssBaseline } from "@mui/material";
import LoginPage from "./pages/LoginPage/LoginPage";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import Loading from "./components/common/Loading";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import PrivateRoute from "./components/common/PrivateRoute";
import DashboardPage from "./components/layout";
import Show from "./utils/Show";
import HomePage from "./pages/HomePage";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectCurrentUser, userActions } from "./features/user-management/user.slice";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      if (user === null) {
        dispatch(userActions.fetchProfile());
      }
    } else {
      navigate("/sign-in");
    }

    const timer = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Show>
        <Show.When isTrue={loading}>
          <Loading onLoaderFinished={function (): void {}} />
        </Show.When>
        <Show.Else>
          <Box display="flex" flexDirection="column">
            <Header />
            <Box display="flex" flex="1 1 0%">
              <Routes>
                <Route path="/sign-in" element={<LoginPage />} />
                <Route
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                >
                  <Route index element={<HomePage />} />
                  {routes.map((routes, index) => {
                    const { component: Component, path } = routes;
                    return (
                      <Route
                        key={index}
                        path={path}
                        element={
                          <Suspense
                            fallback={
                              <Loading
                                onLoaderFinished={function (): void {}}
                              />
                            }
                          >
                            <Component />
                          </Suspense>
                        }
                      />
                    );
                  })}
                </Route>
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Show.Else>
      </Show>
    </>
  );
}

export default App;
