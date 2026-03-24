import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Check, ShieldCheck, Lock, EyeOff, ClipboardList, CircleSlash } from "lucide-react";

const PricingSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto p-4">
      {/* Anonymous (Free Tier) */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-4xl">Anonymous</CardTitle>
          <CardDescription>For quick, secure file transfers.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="text-4xl font-bold">$0 / mo</div>
          <ul className="text-xl">
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Max File Size: 50 MB</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> File Expiration: 24 Hours</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Download Limit: 3 per file</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Standard Encryption</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> "Powered by Expire.link"</li>
          </ul>
        </CardContent>
        <CardFooter className="justify-center items-start h-full ">
          <Button className=" cursor-default hover:bg-primary/0 py-2 px-6 text-2xs" variant={"outline"}>
            Active
          </Button>
        </CardFooter>
      </Card>

      {/* Agent (Pro Tier) */}
      <Card className="border-2 border-primary shadow-lg">
        <CardHeader className="relative">
          <CardTitle className="text-4xl">Agent</CardTitle>
          <CardDescription>For power users and freelancers.</CardDescription>
          <Badge variant="default" className="bg-green-500 shadow-2xl text-2xs text-white w-[100px] text-center flex justify-center absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full h-[100px]   hover:bg-green-500">Popular</Badge>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="text-4xl font-bold">$5 / mo <span className="text-sm">or $49 Lifetime</span></div>
          <ul className="text-xl">
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Max File Size: 2 GB</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> File Expiration: 7 Days</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Unlimited Downloads</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Password Protection</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> "Burn on Read"</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Access Logs</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> No Branding</li>
          </ul>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild>
            <a href="/checkout">Upgrade to Agent</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingSection;
