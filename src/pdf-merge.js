exports.MergePagesToOnePDF = async (job) => {
    const doc = new pdf.Document({})
    for (path of job.vars.pdfLocations) {
        const src = fs.readFileSync(path)
        const ext = new pdf.ExternalDocument(src)
        doc.addPagesOf(ext)
    }
    doc.pipe(fs.createWriteStream(job.vars.finalPDFWithTextLocation))
    await doc.end();
};