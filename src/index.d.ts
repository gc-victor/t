declare const t: {
    bind<HResult>(
        h: (type: any, props: Record<string, any>, ...children: any[]) => HResult
    ): (strings: TemplateStringsArray, ...values: any[]) => HResult | HResult[];
};
export default t;
