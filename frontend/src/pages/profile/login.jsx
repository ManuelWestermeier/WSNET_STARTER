import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Login() {
  const [search, setSearch] = useSearchParams({ u: user, p: password });

  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <div className="form-group mb-1">
          <label htmlFor="exampleInputEmail1">User ID</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onInput={(e) =>
              setSearch({ p: search.get("p"), u: e.target.value })
            }
            value={search.get("u")}
            placeholder="User Id..."
          />
        </div>
        <div className="form-group mb-1">
          <label htmlFor="exampleInputPassword1">User Password</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onInput={(e) =>
              setSearch({ u: search.get("u"), p: e.target.value })
            }
            value={search.get("p")}
            placeholder="Password..."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Login;
