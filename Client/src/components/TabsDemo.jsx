import { useState, useContext } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { toast } from "react-hot-toast"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import Swal from "sweetalert2"


export default function TabsDemo() {

  const { setToken, backendUrl } = useContext(UserContext);

  // Sign Up 
  const [signUpName, setSignUpName] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [signUpMobile, setSignUpMobile] = useState("")
  const [signUpLocation, setSignUpLocation] = useState("")
  const [signUpRole, setSignUpRole] = useState("Donor")

  // Sign In 
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [signInRole, setSignInRole] = useState("Donor")

  const handleSignUp = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Creating your account...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      const data = {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
        mobile: signUpMobile,
        location: signUpLocation,
        role: signUpRole.toLowerCase(),
      }

      const res = await axios.post(`${backendUrl}/user/signup`, data);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Account created!',
        });
        setTimeout(() => {
          window.location.href = `/${signUpRole.toLowerCase()}/profile`;
        }, 1000)
      }
      else {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Unable to create Account!',
          text: res.data.error || "Sign Up failed. Please try again."
        });
      }
    }
    catch (err) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Unable to create Account!',
        text: err.response?.data?.error || "Sign Up failed. Please try again."
      });
    }

  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: signInEmail,
        password: signInPassword,
        role: signInRole.toLowerCase(),
      }


      const res = await axios.post(`${backendUrl}/user/login`, data);
      if (res.data.success) {
        toast.success("Signed In successfully!");
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setTimeout(() => {
          window.location.href = `/${signInRole.toLowerCase()}/profile`;
        }, 1000)
      }
      else {
        toast.error(res.data.error || "Sign In failed. Please try again.");
      }

    }
    catch (err) {
      toast.error(err.response?.data?.error || "Sign In failed. Please try again.");
    }
  }

  return (
    <div className="flex font-pop justify-center items-center">
      <Tabs defaultValue="Sign Up" className="w-full max-w-sm">
        {/* Tab List */}
        <TabsList className="flex justify-center space-x-2">
          <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
          <TabsTrigger value="Sign In">Sign In</TabsTrigger>
        </TabsList>

        {/* Sign Up Tab */}
        <TabsContent value="Sign Up">
          <Card className="border-0">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Register your account to start donating or managing your NGO.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  placeholder={`Enter ${signUpRole == "Donor" ? "Donor" : "NGO"} full name`}
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signup-email">Email ID</Label>
                <Input
                  id="signup-email"
                  placeholder="Enter your email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signup-mobile">Mobile No</Label>
                <Input
                  id="signup-mobile"
                  type=""
                  placeholder="Enter mobile no"
                  value={signUpMobile}
                  onChange={(e) => setSignUpMobile(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signup-location">Location</Label>
                <Input
                  id="signup-location"
                  type="text"
                  placeholder="Enter your location"
                  value={signUpLocation}
                  onChange={(e) => setSignUpLocation(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Enter password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signup-role">Role</Label>
                <select
                  id="signup-role"
                  className="border rounded p-2"
                  value={signUpRole}
                  onChange={(e) => setSignUpRole(e.target.value)}
                >
                  <option value="Donor">Donor</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button className="cursor-pointer" onClick={handleSignUp}>Create Account</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Sign In Tab */}
        <TabsContent value="Sign In">
          <Card className="border-0">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Sign in to your account to manage donations or NGO activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="signin-email">Email ID</Label>
                <Input
                  id="signin-email"
                  placeholder={`Enter ${signInRole == "Donor" ? "Donor" : "NGO"} email`}
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signin-role">Role</Label>
                <select
                  id="signin-role"
                  className="border rounded p-2"
                  value={signInRole}
                  onChange={(e) => setSignInRole(e.target.value)}
                >
                  <option value="Donor">Donor</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button className="cursor-pointer" onClick={handleSignIn}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
